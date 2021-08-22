import React from "react";
import FavoritesToggler from '../components/FavoritesToggler';
import GenerationPicker from '../components/GenerationPicker';
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

function Home() {

	return (
		<main className="home">
			<div className="home__gen-search-wrapper">
			<SearchBar />
			<GenerationPicker />
			</div>
			<FavoritesToggler />
			<PokemonList />
		</main>
	);
}

export default Home;
