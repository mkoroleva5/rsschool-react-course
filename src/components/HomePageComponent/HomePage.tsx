import './HomePage.css';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Card, CardProps } from '../../components/CardComponent/Card';
import { useContext, useEffect, useState } from 'react';
import { ProgressBar } from '../BasicComponents/ProgressBar';
import { Modal } from '../BasicComponents/Modal';
import { ApiContext } from '../../api/ApiContext';

interface StateProps {
  searchValue: string;
  cards: CardProps[];
}

export const HomePage = () => {
  const unsplashApi = useContext(ApiContext);

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
  const [openedId, setOpenedId] = useState<number | null>(null);
  const [state, setState] = useState<StateProps>({
    searchValue: localStorage.getItem('search-value') || '',
    cards: getCardsList(),
  });

  const handleSubmit = (query: string) => {
    setIsPending(true);
    setIsResult(true);

    unsplashApi.search
      .getPhotos({
        query: query,
        orientation: 'landscape',
      })
      .then(({ response }) => {
        setIsPending(false);

        const results = response?.results;

        if (results?.length === 0) {
          setState({ ...state, cards: [] });
          setIsResult(false);
        }

        if (results && results.length > 0) {
          const cardsArr = results.map((item, index) => {
            return {
              id: index,
              name: query,
              description: item.user.instagram_username
                ? `Instagram: @${item.user.instagram_username}`
                : '',
              breed: `Author: ${item.user.name} ${
                item.user.location ? 'from ' + item.user.location : ''
              }`,
              info: `Published at ${item.created_at.slice(0, 10).split('-').reverse().join('.')}`,
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

  const handleOpening = (id: number) => {
    setOpenedId(id);
  };

  const handleClosing = () => {
    setOpenedId(null);
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
      <div className="cards__wrapper" data-testid="cards-wrapper">
        {state.cards.map((item: CardProps) => {
          return (
            <Card
              key={`${item.name}-${item.id}`}
              {...item}
              showFavourites={false}
              isRemovable={true}
              onOpening={handleOpening}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
      {openedId !== null && <Modal page={'cards'} id={openedId} onClose={handleClosing} />}
    </section>
  );
};
