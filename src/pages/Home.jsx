import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

function Home() {
	const [pokemon, setPokemon] = useState(null);
	const [filteredPokemon, setFilteredPokemon] = useState(null);

	const fetchPokemon = async () => {
		const response = await fetch("pokemon.json");
		let data = await response.json();
		data = data.slice(0, 300);
		setPokemon(data);
		setFilteredPokemon(data);
	};

	const filterPokemon = (input) => {
		setFilteredPokemon(
			pokemon.filter((character) => {
				return character.name.toLowerCase().includes(input.toLowerCase());
			})
		);
		console.log(filteredPokemon);
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<main className="home">
			{pokemon && filteredPokemon ? (
				<>
					<SearchBar filterPokemon={filterPokemon} pokemon={pokemon} />
					<PokemonList pokemon={filteredPokemon} />
				</>
			) : (
				<p className="home__loading">Loading...</p>
			)}
		</main>
	);
}

export default Home;
