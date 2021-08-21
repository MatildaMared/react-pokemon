import React from "react";
import FavoritesToggler from '../components/FavoritesToggler';
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

function Home() {

	return (
		<main className="home">
			<SearchBar />
			<FavoritesToggler />
			<PokemonList />
		</main>
	);
}

export default Home;
