import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import React from 'react';
import data from '../../data.json';
import { Card } from '../../components/CardComponent/Card';

export class HomePage extends React.Component {
  constructor(props: object) {
    super(props);
  }

  render() {
    return (
      <section className="home__wrapper">
        <SearchBar />
        <div className="cards__wrapper">
          {data.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </div>
      </section>
    );
  }
}
