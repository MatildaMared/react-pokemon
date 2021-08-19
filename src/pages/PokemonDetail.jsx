import React, { useState, useEffect } from "react";
import PokemonDetailItem from "../components/PokemonDetailItem";
import "./PokemonDetail.scss";
import { useParams, useHistory } from "react-router-dom";

function PokemonDetail() {
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState(false);
	const { id } = useParams();
	const history = useHistory();

	const fetchPokemon = async () => {
		setError(false);
		const response = await fetch("../pokemon.json");
		let data = await response.json();
		data = data[id - 1];
		if (data) {
			setPokemon(data);
		}

		if (!data) {
			setError(true);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<main className="pokemon-detail">
			{pokemon && (
				<article>
					<PokemonDetailItem pokemon={pokemon} />
				</article>
			)}
			{error && <p className="pokemon-detail__error">Couldn't find a pokemon with that ID...</p>}
			<button
				className="btn"
				onClick={() => {
					history.push("/");
				}}>
				Go back
			</button>
		</main>
	);
}

export default PokemonDetail;
