import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import React from 'react';
import data from '../../data/data.json';
import { Card } from '../../components/CardComponent/Card';

export class HomePage extends React.Component {
  render() {
    return (
      <section className="home__wrapper">
        <SearchBar />
        <div className="cards__wrapper">
          {data.map((item) => {
            return <Card key={item.id} {...item} showFavourites={true} />;
          })}
        </div>
      </section>
    );
  }
}
