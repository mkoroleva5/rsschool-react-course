import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export class Header extends React.Component {
  constructor(props: object) {
    super(props);
  }

  state = {
    homeActive: true,
    aboutActive: false,
  };

  render() {
    return (
      <header className="header">
        <Link
          className={this.state.homeActive === true ? 'link active' : 'link'}
          to="/"
          onClick={() => {
            this.setState({ homeActive: true, aboutActive: false });
          }}
        >
          Home
        </Link>
        <Link
          className={this.state.aboutActive === true ? 'link active' : 'link'}
          to="/about"
          onClick={() => {
            this.setState({ homeActive: false, aboutActive: true });
          }}
        >
          About Us
        </Link>
      </header>
    );
  }
}
