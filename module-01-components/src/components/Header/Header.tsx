import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import catLogo from '../../assets/icons/cat-icon.png';

export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <NavLink className="header__link" to="/">
          <img className="header__logo" src={catLogo} alt="Cat" />
        </NavLink>
        <nav className="header__nav">
          <NavLink className="header__link" to="/">
            Home
          </NavLink>
          <NavLink className="header__link" to="/about">
            About Us
          </NavLink>
        </nav>
      </header>
    );
  }
}
