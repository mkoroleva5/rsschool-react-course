import React from 'react';
import './Layout.css';
import { Link, Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';

export class Layout extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <>
        <header className="header">
          <Link className="link" to="/">
            Home
          </Link>
          <Link className="link" to="/about">
            About Us
          </Link>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}
