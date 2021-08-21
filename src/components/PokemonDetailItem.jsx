import React from "react";
import "./PokemonDetailItem.scss";

function PokemonDetailItem({ pokemon }) {
	console.log(pokemon);
	const { name, types, sprites, id } = pokemon;
	const pokeNumber = "#" + id.toString().padStart(3, 0);

	return (
		<article className="pokemon-detail-item">
			<h2 className="pokemon-detail-item__number">{pokeNumber}</h2>
			<img
				className="pokemon-detail-item__image"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
				alt="Pokemon illustration"
			/>
			<h1 className="pokemon-detail-item__name">
				{name.slice(0, 1).toUpperCase() + name.slice(1)}
			</h1>
		</article>
	);
}

export default PokemonDetailItem;
