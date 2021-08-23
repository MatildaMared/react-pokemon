import React, { useState, useContext, useEffect } from "react";
import "./TypeFilter.scss";

import { PokemonContext } from "../PokemonContext";

function TypeFilter() {
	const { context, updateContext } = useContext(PokemonContext);
	const [typeFilter, setTypeFilter] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const availableTypes = [
		"Grass",
		"Poison",
		"Normal",
		"Fire",
		"Fighting",
		"Water",
		"Flying",
		"Electric",
		"Ground",
		"Psychic",
		"Rock",
		"Ice",
		"Bug",
		"Dragon",
		"Ghost",
		"Dark",
		"Steel",
		"Fairy",
	];
	const [typeString, setTypeString] = useState("Show all types");

	const toggleDropdown = () => {
		setShowDropdown((oldVal) => {
			return !oldVal;
		});
	};

	const onTypeClickHandler = (e) => {
		if (typeFilter.includes(e.target.innerText)) {
			setTypeFilter((oldVal) => {
				return oldVal.filter((type) => {
					return type !== e.target.innerText;
				});
			});
		} else {
			setTypeFilter((oldVal) => {
				return [...oldVal, e.target.innerText];
			});
		}
	};

	const onResetClickHandler = () => {
		setShowDropdown(false);
		setTypeFilter([]);
		setTypeString("Show all types");
	};

	useEffect(() => {
		if (typeFilter.length === 0) {
			setTypeString("Show all types");
		} else if (typeFilter.length === 1) {
			setTypeString(typeFilter[0]);
		} else if (typeFilter.length === 2) {
			setTypeString(`${typeFilter[0]} & ${typeFilter[1]}`);
		} else {
			setTypeString(
				`${typeFilter[0]}, ${typeFilter[1]} & ${typeFilter.length - 2} more`
			);
		}
		updateContext({
			typeFilter: typeFilter,
		});
	}, [typeFilter]);

	return (
		<div className="type-filter">
			<div className="type-filter__header" onClick={toggleDropdown}>
				Filter by type
				<span className="type-filter__types">{typeString}</span>
			</div>
			<ul
				className={
					showDropdown
						? "type-filter__list"
						: "type-filter__list type-filter__list--hide"
				}>
				<li className="type-filter__item" onClick={onResetClickHandler}>
					Show all types
				</li>
				{availableTypes.map((type) => (
					<li
						key={type}
						onClick={onTypeClickHandler}
						className={`type-filter__item type-filter__item--${type.toLowerCase()} ${
							typeFilter.includes(type.toUpperCase()) && "active"
						}`}>
						{type}
					</li>
				))}
				<li
					className="type-filter__item"
					onClick={() => {
						setShowDropdown(false);
					}}>
					Close menu
				</li>
			</ul>
		</div>
	);
}

export default TypeFilter;
