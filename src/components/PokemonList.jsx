import React, { useContext } from "react";
import { PokemonContext } from "../PokemonContext";
import PokemonItem from "./PokemonItem";
import "./PokemonList.scss";

function PokemonList() {
	const { context } = useContext(PokemonContext);

	return (
		<section className="pokemon-list">
			{context.filteredPokemon.map((character) => (
				<PokemonItem key={character.id} {...character} />
			))}
		</section>
	);
}

export default PokemonList;
