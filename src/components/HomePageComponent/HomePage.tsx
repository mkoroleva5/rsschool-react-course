import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import data from '../../data/data.json';
import { Card } from '../../components/CardComponent/Card';

export const HomePage = () => {
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
};
