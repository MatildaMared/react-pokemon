import React, { useState, useEffect } from "react";
import "./SearchBar.scss";

function SearchBar({ filterPokemon, pokemon }) {
	const [input, setInput] = useState("");

	const handleInput = (e) => {
		setInput(e.target.value);
		console.log(input);
	};

	useEffect(() => {
		filterPokemon(input);
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
