import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, clearCards, clearSearchValue } from '../../store/cardsSlice';
import { SearchBar } from '../SearchBar/SearchBar';
import { Card, CardProps } from '../Card/Card';
import { useContext, useEffect, useState } from 'react';
import { ProgressBar } from '../BasicComponents/ProgressBar';
import { Modal } from '../BasicComponents/Modal';
import { RootState } from '../../store';
import { ApiContext } from '../../api/ApiContext';

export const HomePage = () => {
  const unsplashApi = useContext(ApiContext);
  const cards = useSelector((state: RootState) => state.cards.cards);
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const [isResult, setIsResult] = useState(true);
  const [openedId, setOpenedId] = useState<number | null>(null);

  const handleSubmit = (query: string) => {
    setIsPending(true);
    setIsResult(true);

    unsplashApi.search
      .getPhotos({
        query: query,
        orientation: 'landscape',
      })
      .then((resolve) => {
        setIsPending(false);
        dispatch(clearCards(null));
        const results = resolve.response?.results;
        if (results?.length === 0) {
          setIsResult(false);
        }
        if (results && results.length > 0) {
          results.map((item, index) => {
            dispatch(
              addCard({
                id: index + 1,
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
              })
            );
          });
          dispatch(clearSearchValue(null));
        }
      })

      .catch((err) => {
        console.log(err);
        setIsResult(false);
        setIsPending(false);
      });
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
      {isPending && <ProgressBar />}
      {!isResult && <p>No results 🙁</p>}
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
