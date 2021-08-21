import React, { useState, useEffect, useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import "./SearchBar.scss";

function SearchBar() {
	const { updateContext } = useContext(PokemonContext);
	const [input, setInput] = useState("");

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	useEffect(() => {
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
