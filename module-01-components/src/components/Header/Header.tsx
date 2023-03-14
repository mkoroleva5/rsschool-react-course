import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export class Header extends React.Component {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <header className="header">
        <NavLink className="link" to="/">
          Home
        </NavLink>
        <NavLink className="link" to="/about">
          About Us
        </NavLink>
      </header>
    );
  }
}
