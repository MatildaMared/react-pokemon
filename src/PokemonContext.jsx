import React, { createContext, useState, useEffect } from "react";
import pokemon from "./data/pokemon.json";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const [context, setContext] = useState({
		pokemon: pokemon.slice(0, 151),
		filteredPokemon: pokemon.slice(0, 151),
		favorites: [],
		sortByFavorites: false,
		filterString: "",
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
		// If sortByFavorites is false and filterString length is more than 0,
		// sort filteredPokemon array by the filterString only
		if (!context.sortByFavorites && context.filterString.length > 0) {
			updateContext({
				filteredPokemon: context.pokemon.filter((character) => {
					return character.name
						.toLowerCase()
						.includes(context.filterString.toLowerCase());
				}),
			});
			// If sortByFavorites is true but the length of filterString is 0,
			// sort filteredPokemon array only based on favorites
		} else if (context.sortByFavorites && context.filterString.length === 0) {
			updateContext({
				filteredPokemon: context.pokemon.filter((character) => {
					return context.favorites.includes(character.id.toString());
				}),
			});
			// If sortByFavorites is true AND the length of filterString is more than 0,
			// sort filteredPokemon array BOTH based on favorites and the filterString
		} else if (context.sortByFavorites && context.filterString.length > 0) {
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
	}, [context.sortByFavorites, context.favorites, context.filterString]);

	const value = { context, updateContext };

	return (
		<PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
	);
};
