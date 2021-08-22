import React, { useContext, useState, useEffect } from "react";
import { PokemonContext } from "../PokemonContext";
import "./FavoritesToggler.scss";

function FavoritesToggler() {
	const { context, updateContext } = useContext(PokemonContext);
	const [isChecked, setIsChecked] = useState(context.showOnlyFavorites);
	const onChangeHandler = (e) => {
		setIsChecked((previousVal) => {
			return !previousVal;
		});
	};

	useEffect(() => {
		updateContext({
			sortByFavorites: isChecked,
		});
	}, [isChecked]);

	return (
		<section className="favorites-toggler">
			<label className="favorites-toggler__label">
				Show only favorites
				<input type="checkbox" checked={context.showOnlyFavorites} onChange={onChangeHandler} />
				<span className="favorites-toggler__checkmark"></span>
			</label>
		</section>
	);
}

export default FavoritesToggler;
