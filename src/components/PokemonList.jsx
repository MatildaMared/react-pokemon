import React from "react";
import PokemonItem from "./PokemonItem";
import "./PokemonList.scss";

function PokemonList({ pokemon }) {
	return (
		<section className="pokemon-list">
			{pokemon.map((character) => (
				<PokemonItem key={character.id} {...character} />
			))}
		</section>
	);
}

export default PokemonList;
