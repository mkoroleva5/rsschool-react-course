import './HomePage.css';
import { fetchPhotos, setQueryResult } from '../../store/cardsSlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Card, CardProps } from '../Card/Card';
import { useEffect, useState } from 'react';
import { ProgressBar } from '../BasicComponents/ProgressBar';
import { Modal } from '../BasicComponents/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { useSearchParams } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const locationQuery = searchParams.get('search');

  const cards = useAppSelector((state) => state.cards.cards);
  const queryResult = useAppSelector((state) => state.cards.queryResult);
  const status = useAppSelector((state) => state.cards.status);
  const error = useAppSelector((state) => state.cards.error);
  const dispatch = useAppDispatch();

  const [openedId, setOpenedId] = useState<number | null>(null);

  const handleSubmit = (query: string) => {
    dispatch(setQueryResult({ value: query }));
    dispatch(fetchPhotos(query));
    setCookie(query);
  };

  useEffect(() => {
    if (locationQuery) {
      dispatch(setQueryResult({ value: locationQuery }));
      dispatch(fetchPhotos(locationQuery));
    }
  }, [dispatch, locationQuery]);

  useEffect(() => {
    setSearchParams({ ['search']: queryResult });
  }, [queryResult, setSearchParams]);

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
      {error && <p>An error occured: {error}</p>}
      <div className="cards__wrapper" data-testid="cards-wrapper">
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
      {openedId !== null && <Modal id={openedId} onClose={handleClosing} />}
    </section>
  );
};
