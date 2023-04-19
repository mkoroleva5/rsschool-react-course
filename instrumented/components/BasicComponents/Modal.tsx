import { useState } from 'react';
import './Modal.css';
import { Rating } from './Rating';
import { Spinner } from './Spinner';
import { useAppSelector } from '../../hooks/useRedux';

interface ModalProps {
  id: number | null;
  onClose: () => void;
}

export const Modal = ({ id, onClose }: ModalProps) => {
  const cards = useAppSelector((state) => state.cards.cards);
  const card = cards.find((el) => el.id === id);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      data-testid={`modal-${id}`}
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
          data-testid={`modal-close-button-${id}`}
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
        {!isLoaded && <Spinner testId={`modal-spinner-${id}`} />}
        <div className="modal__info">
          <h3 className="modal__title">{card?.name}</h3>
          <p className="modal__breed">{card?.breed}</p>
          <p className="modal__text">{card?.description}</p>
          <p className="modal__text">{card?.info}</p>
          <p className="modal__gender">{card?.gender}</p>
        </div>
        {card?.cuteness && (
          <div className="modal__rating">
            <Rating size={35} cuteness={card?.cuteness} testId={`modal-rating-${id}`} />
          </div>
        )}
      </div>
    </div>
  );
};
