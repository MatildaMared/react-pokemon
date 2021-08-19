import React from "react";
import "./PokemonItem.scss";
import { useHistory } from "react-router-dom";

function PokemonItem({ id, name, image, type }) {
  const history = useHistory();
  const pokeNumber = "#" + id.toString().padStart(3, 0);

  const redirectToDetailsPage = () => {
    history.push(`/pokemon/${id}`);
  }

	return (
		<article className="pokemon-item" onClick={redirectToDetailsPage}>
      <div className="pokemon-item__info">
        <h2 className="pokemon-item__number">{pokeNumber}</h2>
				<h1 className="pokemon-item__name">{name}</h1>
				<p className="pokemon-item__type">{type.map((type) => type + " ")}</p>
			</div>
			<img className="pokemon-item__image" src={image.thumbnail} alt="" />
		</article>
	);
}

export default PokemonItem;
