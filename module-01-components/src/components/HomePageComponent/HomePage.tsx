import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import React from 'react';

export class HomePage extends React.Component {
  constructor(props: object) {
    super(props);
  }
  render() {
    return (
      <section className="home-wrapper">
        <SearchBar />
      </section>
    );
  }
}
