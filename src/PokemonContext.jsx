import React, { createContext, useState, useEffect } from "react";
import pokemon from "./data/pokemon.json";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const [context, setContext] = useState({
		pokemon: pokemon.slice(0, 151),
		filteredPokemon: pokemon.slice(0, 151),
		favorites: JSON.parse(localStorage.getItem("favorites")) || [],
		sortByFavorites: false,
		filterString: "",
		typeFilter: [],
		generations: [
			{
				name: "Generation I",
				startIndex: 0,
				endIndex: 151,
			},
			{
				name: "Generation II",
				startIndex: 151,
				endIndex: 251,
			},
			{
				name: "Generation III",
				startIndex: 251,
				endIndex: 386,
			},
			{
				name: "Generation IV",
				startIndex: 386,
				endIndex: 493,
			},
			{
				name: "Generation V",
				startIndex: 493,
				endIndex: 649,
			},
			{
				name: "Generation VI",
				startIndex: 649,
				endIndex: 721,
			},
			{
				name: "Generation VII",
				startIndex: 721,
				endIndex: 809,
			},
		],
		activeGeneration: {
			name: "Generation I",
			number: 1,
		},
	});

	function updateContext(updates) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	useEffect(() => {
		const [currentGen] = context.generations.filter((gen) => {
			return gen.name === context.activeGeneration.name;
		});

		// Create new array with only the pokemon from the current generation
		// chosen by the user
		const currentPokemon = pokemon.slice(
			currentGen.startIndex,
			currentGen.endIndex
		);

		// If sortByFavorites is true, sort the filteredPokemon array based
		// on user favorites
		if (context.sortByFavorites && context.typeFilter.length === 0) {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: sortByFavorites(currentPokemon),
				filterString: "",
			});
			// Else set both pokemon and filteredPokemon to the new array based
			// on the generation chosen by the user
		} else if (context.sortByFavorites && context.typeFilter.length > 0) {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: sortByFavorites(sortByType(currentPokemon)),
			});
		} else if (!context.sortByFavorites && context.typeFilter.length > 0) {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: sortByType(currentPokemon),
			});
		} else {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: currentPokemon,
				filterString: "",
			});
		}
	}, [context.activeGeneration]);

	function sortByType(pokemonArr) {
		return pokemonArr.filter((character) => {
			const upperCaseArr = character.type.map((type) => type.toUpperCase());
			return upperCaseArr.some((val) => context.typeFilter.includes(val));
		});
	}

	function sortByString(pokemonArr) {
		return pokemonArr.filter((character) => {
			return character.name
				.toLowerCase()
				.includes(context.filterString.toLowerCase());
		});
	}

	function sortByFavorites(pokemonArr) {
		return pokemonArr.filter((character) => {
			return context.favorites.includes(character.id.toString());
		});
	}

	useEffect(() => {
		let newFilteredPokemon = [];
		// Sort based on type only
		if (
			!context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length > 0
		) {
			newFilteredPokemon = sortByType(context.pokemon);
			// Sort based on type and favorites
		} else if (
			context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length > 0
		) {
			newFilteredPokemon = sortByFavorites(sortByType(context.pokemon));
			// Sort based on type and filterString
		} else if (
			!context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length > 0
		) {
			newFilteredPokemon = sortByString(sortByType(context.pokemon));
			// Sort based on type, favorites and filterString
		} else if (
			context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length > 0
		) {
			newFilteredPokemon = sortByFavorites(
				sortByType(sortByString(context.pokemon))
			);
			// Sort based on filterString
		} else if (
			!context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length === 0
		) {
			newFilteredPokemon = sortByString(context.pokemon);
			// Sort based on favorites
		} else if (
			context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length === 0
		) {
			newFilteredPokemon = sortByFavorites(context.pokemon);
			// Sort based on filterString and favorites
		} else if (
			context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter === 0
		) {
			newFilteredPokemon = sortByFavorites(sortByString(context.pokemon));
			// Set array equal to original pokemon array
		} else {
			newFilteredPokemon = context.pokemon;
		}
		updateContext({
			filteredPokemon: newFilteredPokemon,
		});
	}, [
		context.sortByFavorites,
		context.favorites,
		context.filterString,
		context.typeFilter,
	]);

	// Each time the favorites array changes, save the array to localStorage to
	// keep the favorites stored even though the user refreshes the page
	useEffect(() => {
		localStorage.removeItem("favorites");
		localStorage.setItem("favorites", JSON.stringify(context.favorites));
	}, [context.favorites]);

	const value = { context, updateContext };

	return (
		<PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
	);
};
