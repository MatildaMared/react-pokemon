import React, { useState, useEffect } from "react";
import "./PokemonDetail.scss";
import { useParams, useHistory } from "react-router-dom";
import PokemonDetailItem from "../components/PokemonDetailItem";

function PokemonDetail() {
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState(false);
	const { id } = useParams();
	const history = useHistory();

	const fetchPokemon = async () => {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const data = await response.json();
			setPokemon(data);
		} catch (err) {
			setError(true);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<main className="pokemon-detail">
			{pokemon && <PokemonDetailItem pokemon={pokemon} />}
			{error && (
				<p className="pokemon-detail__error">
					Couldn't find a pokemon with that ID...
				</p>
			)}
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
