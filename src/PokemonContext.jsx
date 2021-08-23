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
		if (context.sortByFavorites) {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: currentPokemon.filter((character) => {
					return context.favorites.includes(character.id.toString());
				}),
				filterString: "",
			});
			// Else set both pokemon and filteredPokemon to the new array based
			// on the generation chosen by the user
		} else {
			updateContext({
				pokemon: currentPokemon,
				filteredPokemon: currentPokemon,
				filterString: "",
			});
		}
	}, [context.activeGeneration]);

	useEffect(() => {
		// If sortByFavorites is false, filterString length is 0 but
		// typeFilter is not empty, sort filteredPokemon by typeFilter
		// only
		if (
			!context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length > 0
		) {
			const newFiltered = context.pokemon.filter((character) => {
				const upperCaseArr = character.type.map((type) => type.toUpperCase());
				console.log(upperCaseArr);
				return upperCaseArr.some((val) => context.typeFilter.includes(val));
			});
			updateContext({
				filteredPokemon: newFiltered,
			});
			// If sortByFavorites is true, filterString length is 0 and typeFilter
			// is not empty, sort filteredPokemon by both typeFilter and
			// favorites
		} else if (
			context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length > 0
		) {
			const newFiltered = context.pokemon.filter((character) => {
				const upperCaseArr = character.type.map((type) => type.toUpperCase());
				console.log(upperCaseArr);
				return upperCaseArr.some((val) => context.typeFilter.includes(val));
			});
			updateContext({
				filteredPokemon: newFiltered.filter((character) => {
					return context.favorites.includes(character.id.toString());
				}),
			});
			// If sortByFavorites is false, but filterString length is more
			// than 0 and typeFilter length is more than 0, sort filteredPokemon
			// based on typeFilter and filterString
		} else if (
			!context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length > 0
		) {
			let newFiltered = context.pokemon.filter((character) => {
				const upperCaseArr = character.type.map((type) => type.toUpperCase());
				console.log(upperCaseArr);
				return upperCaseArr.some((val) => context.typeFilter.includes(val));
			});
			updateContext({
				filteredPokemon: newFiltered.filter((character) => {
					return character.name
						.toLowerCase()
						.includes(context.filterString.toLowerCase());
				}),
			});
			// If sortByFavorites is true, filterString length is more than 0
			// and typeFilter length is more than 0, sort filteredPokemon
			// based on all three
		} else if (
			context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length > 0
		) {
			let newFiltered = context.pokemon.filter((character) => {
				const upperCaseArr = character.type.map((type) => type.toUpperCase());
				console.log(upperCaseArr);
				return upperCaseArr.some((val) => context.typeFilter.includes(val));
			});
			newFiltered = newFiltered.filter((character) => {
				return character.name
					.toLowerCase()
					.includes(context.filterString.toLowerCase());
			});
			updateContext({
				filteredPokemon: newFiltered.filter((character) => {
					return character.name
						.toLowerCase()
						.includes(context.filterString.toLowerCase());
				}),
			});
			// If sortByFavorites is false, typeFilter length is 0,
			// and filterString length is more than 0,
			// sort filteredPokemon array by the filterString only
		} else if (
			!context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter.length === 0
		) {
			updateContext({
				filteredPokemon: context.pokemon.filter((character) => {
					return character.name
						.toLowerCase()
						.includes(context.filterString.toLowerCase());
				}),
			});
			// If sortByFavorites is true, typeFilter length is 0
			// and length of filterString is 0,
			// sort filteredPokemon array only based on user favorites
		} else if (
			context.sortByFavorites &&
			context.filterString.length === 0 &&
			context.typeFilter.length === 0
		) {
			updateContext({
				filteredPokemon: context.pokemon.filter((character) => {
					return context.favorites.includes(character.id.toString());
				}),
			});
			// If sortByFavorites is true, typeFilter length is 0
			// and the length of filterString is more than 0,
			// sort filteredPokemon array based on user favorites and the filterString
		} else if (
			context.sortByFavorites &&
			context.filterString.length > 0 &&
			context.typeFilter === 0
		) {
			let newFilteredPokemon = context.pokemon.filter((character) => {
				return (
					character.name
						.toLowerCase()
						.includes(context.filterString.toLowerCase()) &&
					context.favorites.includes(character.id.toString())
				);
			});
			updateContext({
				filteredPokemon: newFilteredPokemon,
			});
			// If sortByFavorites is false and the filterString length is equal to zero,
			// set the filteredPokemon array equal to the original pokemon array
		} else {
			updateContext({
				filteredPokemon: context.pokemon,
			});
		}
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
