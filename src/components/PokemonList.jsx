import React from "react";
import PokemonItem from "./PokemonItem";
import "./PokemonList.scss";

function PokemonList({ pokemon, toggleFavorite, favorites }) {
	return (
		<section className="pokemon-list">
			{pokemon.map((character) => (
				<PokemonItem key={character.id} {...character} toggleFavorite={toggleFavorite} favorites={favorites} />
			))}
		</section>
	);
}

export default PokemonList;
