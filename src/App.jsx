import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";
import pikachu from "./assets/pikachu.svg";
import "./App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/pokemon/:id">
						<PokemonDetail />
					</Route>
				</Switch>
				<img className="pikachu" src={pikachu} />
				<Footer />
			</Router>
		</div>
	);
}

export default App;
