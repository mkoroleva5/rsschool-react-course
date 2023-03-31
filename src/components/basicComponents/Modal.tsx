import { useState } from 'react';
import { CardProps } from '../../components/CardComponent/Card';
import './Modal.css';
import { Rating } from './Rating';
import { Spinner } from './Spinner';

interface ModalProps {
  page: string;
  id: number | null;
  onClose: () => void;
}

export const Modal = ({ page, id, onClose }: ModalProps) => {
  const getCardsList = () => {
    const cardsList = localStorage.getItem(`${page}-list`);

    try {
      return cardsList ? (JSON.parse(cardsList) as CardProps[]) : [];
    } catch (err) {
      localStorage.removeItem('cards-list');
      return [];
    }
  };

  const card = getCardsList().find((el) => el.id === id);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="modal__wrapper"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <div className="modal__card">
        <button
          className="modal__close-button"
          onClick={() => {
            onClose();
          }}
        ></button>
        <img
          className="modal__image"
          src={card?.image}
          alt="Image"
          draggable={false}
          onLoad={() => {
            setIsLoaded(true);
          }}
          style={!isLoaded ? { opacity: 0 } : { opacity: 1 }}
        />
        {!isLoaded && <Spinner />}
        <div className="modal__info">
          <h3 className="modal__title">{card?.name}</h3>
          <p className="modal__breed">{card?.breed}</p>
          <p className="modal__text">{card?.description}</p>
          <p className="modal__text">{card?.info}</p>
          <p className="modal__gender">{card?.gender}</p>
        </div>
        {card?.cuteness && (
          <div className="modal__rating">
            <Rating size={35} cuteness={card?.cuteness} />
          </div>
        )}
      </div>
    </div>
  );
};
