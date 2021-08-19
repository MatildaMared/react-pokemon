import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import "./Home.scss";

function Home() {
	const [pokemon, setPokemon] = useState(null);

	const fetchPokemon = async () => {
		const response = await fetch("pokemon.json");
		let data = await response.json();
		data = data.slice(0, 151);
		setPokemon(data);
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<main className="home">
			{pokemon ? (
				<PokemonList pokemon={pokemon} />
			) : (
				<p className="home__loading">Loading...</p>
			)}
		</main>
	);
}

export default Home;
