import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { PokemonProvider } from "./PokemonContext";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<PokemonProvider>
			<App />
		</PokemonProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
