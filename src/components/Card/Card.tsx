import { useState } from 'react';
import './Card.css';
import noImage from '../../assets/images/default.jpg';
import { Rating } from '../BasicComponents/Rating';
import trashIcon from '../../assets/icons/trash.svg';
import { Spinner } from '../BasicComponents/Spinner';
import { removeCard } from '../../store/cardsSlice';
import { useDispatch } from 'react-redux';
import { removeCat } from '../../store/catsSlice';

export interface CardProps {
  page?: string;
  id: number;
  name: string;
  description: string;
  breed?: string;
  gender?: string;
  cuteness?: number;
  info?: string;
  image: string;
  isRemovable?: boolean;
  onOpening?: (id: number) => void;
}

export const Card = ({ ...props }: CardProps) => {
  const { page, id, name, gender, cuteness, image, isRemovable, onOpening } = props;
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      data-testid={`card-${id}`}
      className="card__wrapper"
      onClick={() => {
        if (onOpening) {
          onOpening(id);
        }
      }}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <img
        data-testid={`image-${id}`}
        src={image || noImage}
        alt={name}
        className={`${page === 'cards' ? 'card__image_cards' : 'card__image_cats'}`}
        draggable={false}
        onLoad={() => {
          setIsLoaded(true);
        }}
        style={!isLoaded ? { opacity: 0 } : { opacity: 1 }}
      />
      {!isLoaded && <Spinner />}
      {page === 'cats' && (
        <div className="card__info">
          <h3 className="card__title">{name}</h3>
        </div>
      )}
      <p className={`${page === 'cards' ? 'card__gender_cards' : 'card__gender_cats'}`}>{gender}</p>
      {cuteness && (
        <div className="card__rating">
          <Rating size={35} cuteness={cuteness} />
        </div>
      )}
      {isRemovable && (
        <button
          data-testid={`delete-button-${id}`}
          type="button"
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            if (page === 'cats') {
              dispatch(removeCat({ id }));
            } else {
              dispatch(removeCard({ id }));
            }
          }}
        >
          <img className="delete-button-icon" src={trashIcon} alt="Delete" />
        </button>
      )}
    </div>
  );
};
