import React, { useContext } from "react";
import "./PokemonItem.scss";
import { useHistory } from "react-router-dom";
import { PokemonContext } from '../PokemonContext';

function PokemonItem({ id, name, image, type }) {
	const { context, updateContext } = useContext(PokemonContext);
	const history = useHistory();
	const pokeNumber = "#" + id.toString().padStart(3, 0);

	const redirectToDetailsPage = () => {
		// Set filteredPokemon back to the original array before sending the user to details page
		updateContext({
			filteredPokemon: context.pokemon,
		});
		history.push(`/pokemon/${id}`);
	};

	const toggleFavorite = (e) => {
		e.stopPropagation();
		const id = e.target.dataset.id;

		// If pokemon ID is already in the favorites list, remove it
		if (context.favorites.includes(id)) {
			updateContext({
				favorites: context.favorites.filter((item) => item !== id),
			});

			// If the pokemon ID is not in the favorites list, add it
		} else {
			updateContext({
				favorites: [...context.favorites, id],
			});
		}
	};

	return (
		<article className="pokemon-item" onClick={redirectToDetailsPage}>
			<div className="pokemon-item__info">
				<div className="pokemon-item__num-icon-wrapper">
					<h2 className="pokemon-item__number">{pokeNumber}</h2>
					<div className="pokemon-item__favorite">
						<i
							className={`bx ${
								context.favorites.includes(id.toString())
									? "bxs-heart pokemon-item__icon--favorite"
									: "bx-heart"
							} pokemon-item__icon`}
							data-id={id}
							onClick={(e) => toggleFavorite(e)}></i>
					</div>
				</div>
				<h1 className="pokemon-item__name">{name}</h1>
				{type.map((type) => (
					<p
						key={type}
						className={`pokemon-item__type pokemon-item__type--${type.toLowerCase()}`}>
						{type}
					</p>
				))}
			</div>
			<img className="pokemon-item__image" src={image.thumbnail} alt="" />
		</article>
	);
}

export default PokemonItem;
