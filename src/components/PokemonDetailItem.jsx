import React from "react";
import "./PokemonDetailItem.scss";

function PokemonDetailItem(pokemon) {
	const { name, image, type, id } = pokemon.pokemon;
	const pokeNumber = "#" + id.toString().padStart(3, 0);

	return (
		<article className="pokemon-detail-item">
			<h2 className="pokemon-detail-item__number">{pokeNumber}</h2>
			<img
				className="pokemon-detail-item__image"
				src={image.url}
				alt="Pokemon illustration"
			/>
			<h1 className="pokemon-detail-item__name">{name}</h1>
		</article>
	);
}

export default PokemonDetailItem;
