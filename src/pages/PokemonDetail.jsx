import React, { useState, useEffect, useContext } from "react";
import "./PokemonDetail.scss";
import { useParams, useHistory } from "react-router-dom";
import PokemonDetailItem from "../components/PokemonDetailItem";
import { PokemonContext } from "../PokemonContext";

function PokemonDetail() {
	const { context, updateContext } = useContext(PokemonContext);
	const [pokemon, setPokemon] = useState(null);
	const [error, setError] = useState(false);
	const { id } = useParams();
	const history = useHistory();

	const fetchPokemon = async () => {
		try {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			const data = await response.json();
			console.log(data);
			setPokemon(data);
		} catch (err) {
			setError(true);
		}
	};

	useEffect(() => {
		fetchPokemon();
		// if (context.pokemon) {
		// 	setPokemon(context.pokemon[id - 1]);
		// }
	}, []);

	// useEffect(() => {
	// 	if (!pokemon) {
	// 		setError(true);
	// 	} else {
	// 		setError(false);
	// 	}
	// }, [pokemon]);

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
