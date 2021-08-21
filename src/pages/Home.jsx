import React from "react";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

function Home() {

	return (
		<main className="home">
			<SearchBar />
			<PokemonList />
		</main>
	);
}

export default Home;
