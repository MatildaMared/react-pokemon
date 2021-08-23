import React from "react";
import BackToTopBtn from "../components/BackToTopBtn";
import FavoritesToggler from "../components/FavoritesToggler";
import GenerationPicker from "../components/GenerationPicker";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import "./Home.scss";

function Home() {
	return (
		<main className="home">
			<SearchBar />
			<div className="home__gen-search-wrapper">
				<GenerationPicker />
				<TypeFilter />
			</div>
			<FavoritesToggler />
			<PokemonList />
			<BackToTopBtn />
		</main>
	);
}

export default Home;
