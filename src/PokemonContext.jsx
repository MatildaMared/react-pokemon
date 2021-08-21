import React, { createContext, useState } from "react";
import pokemon from "./data/pokemon.json";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
	const [context, setContext] = useState({
		pokemon: pokemon.slice(0, 151),
		filteredPokemon: pokemon.slice(0, 151),
		favorites: [],
	});

	function updateContext(updates) {
		setContext((prevState) => {
			return {
				...prevState,
				...updates,
			};
		});
	}

	const value = { context, updateContext };

	return (
		<PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
	);
};
