import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

export class Layout extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <>
        <Header />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}
