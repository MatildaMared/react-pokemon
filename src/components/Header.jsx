import React from 'react';
import logo from "../assets/pokemon-logo.png";
import "./Header.scss";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Pokémon logo" />
    </header>
  )
}

export default Header
