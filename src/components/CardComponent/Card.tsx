import { useEffect, useState } from 'react';
import './Card.css';
import noImage from '../../assets/images/default.jpg';
import { Rating } from '../../components/basicComponents/Rating';
import trashIcon from '../../assets/icons/trash.svg';
import { Spinner } from '../../components/basicComponents/Spinner';

export interface CardProps {
  id: number;
  name: string;
  description: string;
  breed?: string;
  gender?: string;
  cuteness?: number;
  info?: string;
  image: string;
  showFavourites?: boolean;
  isRemovable?: boolean;
  onOpening?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const Card = ({ ...props }: CardProps) => {
  const { id, name, gender, cuteness, image, showFavourites, isRemovable, onOpening, onDelete } =
    props;

  const cardName = `card-${id}`;
  const savedFavourite = () => {
    if (localStorage.getItem(cardName) === 'true') {
      return true;
    } else if (localStorage.getItem(cardName) === 'false') {
      return false;
    }
    return undefined;
  };

  const [isFavourite, setIsFavourite] = useState(savedFavourite() || false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem(cardName, `${isFavourite}`);
  }, [showFavourites, cardName, isFavourite]);

  const handleClick = () => {
    setIsFavourite((prev: boolean) => !prev);
  };

  return (
    <div
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
        className="card__image"
        draggable={false}
        onLoad={() => {
          setIsLoaded(true);
        }}
        style={!isLoaded ? { opacity: 0 } : { opacity: 1 }}
      />
      {!isLoaded && <Spinner />}
      <div className="card__info">
        <h3 className="card__title">{name}</h3>
      </div>
      <p className="card__gender">{gender}</p>
      {cuteness && (
        <div className="card__rating">
          <Rating size={35} cuteness={cuteness} />
        </div>
      )}
      {showFavourites && (
        <button
          data-testid={`star-button-${id}`}
          type="button"
          className="card__button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <svg
            data-testid={`star-svg-${id}`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#dcdcdc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`card__button_icon ${isFavourite ? 'favourite' : ''}`}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </button>
      )}
      {isRemovable && (
        <button
          data-testid={`delete-button-${id}`}
          type="button"
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) {
              onDelete(id);
            }
          }}
        >
          <img className="delete-button-icon" src={trashIcon} alt="Delete" />
        </button>
      )}
    </div>
  );
};
