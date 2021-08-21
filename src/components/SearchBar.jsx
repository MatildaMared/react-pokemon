import React, { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import "./SearchBar.scss";

function SearchBar() {
	const { context, updateContext } = useContext(PokemonContext);
	const [input, setInput] = useState("");

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const filterPokemon = (input) => {
		if (input.length === 0) {
			updateContext({
				filteredPokemon: context.pokemon,
			});
		} else {
			updateContext({
				filteredPokemon: context.pokemon.filter((character) => {
					return character.name.toLowerCase().includes(input.toLowerCase());
				}),
			});
		}
	};

	useEffect(() => {
		// filterPokemon(input);
		updateContext({
			filterString: input,
		});
	}, [input]);

	return (
		<section className="search-bar">
			<input
				type="text"
				className="search-bar__input"
				placeholder="Search pokemon by name..."
				value={input}
				onChange={handleInput}
			/>
		</section>
	);
}

export default SearchBar;
