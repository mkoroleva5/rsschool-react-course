import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Card, CardProps } from '../../components/CardComponent/Card';
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { ProgressBar } from '../../components/basicComponents/ProgressBar';

const unsplash = createApi({
  accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
});

interface StateProps {
  searchValue: string;
  cards: CardProps[];
}

export const HomePage = () => {
  const getCardsList = () => {
    const cardsList = localStorage.getItem('cards-list');

    try {
      return cardsList ? (JSON.parse(cardsList) as CardProps[]) : [];
    } catch (err) {
      localStorage.removeItem('cards-list');
      return [];
    }
  };

  const [isPending, setIsPending] = useState(false);
  const [isResult, setIsResult] = useState(true);
  const [state, setState] = useState<StateProps>({
    searchValue: localStorage.getItem('search-value') || '',
    cards: getCardsList(),
  });

  const handleSubmit = async (query: string) => {
    setIsPending(true);
    setIsResult(true);

    await unsplash.search
      .getPhotos({
        query: query,
        orientation: 'landscape',
      })
      .then((resolve) => {
        setIsPending(false);

        const results = resolve.response?.results;
        if (results?.length === 0) {
          setState({ ...state, cards: [] });
          setIsResult(false);
        }
        if (results && results.length > 0) {
          const cardsArr = results.map((item, index) => {
            return {
              id: index,
              name: query,
              description:
                item.user.instagram_username && `Instagram: ${item.user.instagram_username}`,
              breed: `Author: ${item.user.name}`,
              meals: `Published at ${item.created_at.slice(0, 10).split('-').reverse().join('.')}`,
              gender: `♥ ${item.likes}`,

              image: item.urls.regular,
            };
          });
          setState({ ...state, searchValue: '', cards: cardsArr });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsResult(false);
        setIsPending(false);
      });
  };

  const handleDelete = (id: number) => {
    const deletedCatIndex = state.cards.findIndex((el) => el.id === id);
    setState({ ...state, cards: state.cards.filter((_, i) => i !== deletedCatIndex) });
    localStorage.setItem('cards-list', JSON.stringify(state.cards));
  };

  useEffect(() => {
    localStorage.setItem('search-value', state.searchValue);
    localStorage.setItem('cards-list', JSON.stringify(state.cards));
  }, [state]);

  return (
    <section className="home__wrapper">
      <SearchBar onSubmit={handleSubmit} />
      {isPending && <ProgressBar />}
      {!isResult && <p>No results 🙁</p>}
      <div className="cards__wrapper">
        {state.cards.map((item: CardProps) => {
          return (
            <Card
              key={`${item.name}-${item.id}`}
              {...item}
              showFavourites={false}
              isRemovable={true}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </section>
  );
};
