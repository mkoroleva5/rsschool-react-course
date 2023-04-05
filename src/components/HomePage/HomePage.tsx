import './HomePage.css';
import { fetchPhotos } from '../../store/cardsSlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Card, CardProps } from '../Card/Card';
import { useEffect, useState } from 'react';
import { ProgressBar } from '../BasicComponents/ProgressBar';
import { Modal } from '../BasicComponents/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

export const HomePage = () => {
  const cards = useAppSelector((state) => state.cards.cards);
  const status = useAppSelector((state) => state.cards.status);
  const error = useAppSelector((state) => state.cards.error);

  const dispatch = useAppDispatch();

  const [openedId, setOpenedId] = useState<number | null>(null);

  const handleSubmit = (query: string) => {
    dispatch(fetchPhotos(query));
  };

  useEffect(() => {
    localStorage.setItem('cards-list', JSON.stringify(cards));
  }, [cards]);

  const handleOpening = (id: number) => {
    setOpenedId(id);
  };

  const handleClosing = () => {
    setOpenedId(null);
  };

  return (
    <section className="home__wrapper">
      <SearchBar onSubmit={handleSubmit} />
      {status === 'pending' && <ProgressBar />}
      {status === 'no results' && <p>No results 🙁</p>}
      {error && <p>An error occured: {error instanceof Error ? `${error}` : 'unknown error'}</p>}
      <div className="cards__wrapper">
        {cards.map((item: CardProps, index) => {
          return (
            <Card
              key={`${item.name}-${index}`}
              {...item}
              page="cards"
              isRemovable={true}
              onOpening={handleOpening}
            />
          );
        })}
      </div>
      {openedId !== null && <Modal page={'cards'} id={openedId} onClose={handleClosing} />}
    </section>
  );
};
