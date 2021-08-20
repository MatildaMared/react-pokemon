import React, { useEffect, useState } from "react";
import PokemonList from "../components/PokemonList";
import SearchBar from "../components/SearchBar";
import "./Home.scss";

function Home() {
	const [pokemon, setPokemon] = useState(null);
	const [filteredPokemon, setFilteredPokemon] = useState(null);
	const [favorites, setFavorites] = useState([]);

	//FORTSÄTT HÄR :D Skapa "visa bara favoriter"-knapp
	const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

	const toggleFavorite = (e) => {
		e.stopPropagation();
		const id = e.target.dataset.id;

		// If pokemon ID is already in the favorites list, remove it
		if (favorites.includes(id)) {
			setFavorites((prevState) => {
				return prevState.filter((item) => item !== id);
			});

			// If the pokemon ID is not in the favorites list, add it
		} else {
			setFavorites((prevState) => {
				return [...prevState, id];
			});
		}
	};

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
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<main className="home">
			{pokemon && filteredPokemon ? (
				<>
					<SearchBar filterPokemon={filterPokemon} pokemon={pokemon} />
					<PokemonList
						pokemon={filteredPokemon}
						toggleFavorite={toggleFavorite}
						favorites={favorites}
					/>
				</>
			) : (
				<p className="home__loading">Loading...</p>
			)}
		</main>
	);
}

export default Home;
