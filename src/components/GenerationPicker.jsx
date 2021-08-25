import React, { useState, useContext, useEffect, useRef } from "react";
import "./GenerationPicker.scss";

import { PokemonContext } from "../PokemonContext";

function GenerationPicker() {
	const { context, updateContext } = useContext(PokemonContext);
	const [activeGen, setActiveGen] = useState(context.activeGeneration);
	const [showDropdown, setShowDropdown] = useState(false);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => {
		setShowDropdown((oldVal) => {
			return !oldVal;
		});
	};

	const onClickHandler = (e) => {
		setActiveGen({
			name: e.target.innerText,
			number: e.target.dataset.number,
		});
		setShowDropdown(false);
	};

	const handleClickOutside = (e) => {
		if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
			setShowDropdown(false);
		}
	};

	useEffect(() => {
		updateContext({
			activeGeneration: activeGen,
		});
	}, [activeGen]);

	useEffect(() => {
		if (showDropdown) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [showDropdown]);

	return (
		<div className="generation-picker">
			<div
				className={`generation-picker__active gen gen-${activeGen.number}`}
				onClick={toggleDropdown}>
				{activeGen.name}
			</div>
			<ul
				ref={dropdownRef}
				className={
					showDropdown
						? "generation-picker__list"
						: "generation-picker__list generation-picker__list--hide"
				}>
				{context.generations.map((gen, i) => (
					<li
						key={i}
						onClick={onClickHandler}
						data-number={i + 1}
						className={`generation-picker__item gen gen-${i + 1}`}>
						{gen.name}
					</li>
				))}
			</ul>
		</div>
	);
}

export default GenerationPicker;
