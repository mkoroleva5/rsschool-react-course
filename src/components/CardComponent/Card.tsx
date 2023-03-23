import React from 'react';
import './Card.css';
import noImage from '../../assets/images/default.jpg';
import { Rating } from '../../components/basicComponents/Rating';
import trashIcon from '../../assets/icons/trash.svg';

interface CardProps {
  id: number;
  name: string;
  description: string;
  breed: string;
  gender: string;
  cuteness: number;
  meals?: string;
  image: string;
  showFavourites?: boolean;
  isRemovable?: boolean;
  onDelete?: (id: number) => void;
}

interface CardState {
  favourite: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
  state = {
    favourite: false,
  };

  cardName = `card-${this.props.id}`;

  handleFavouriteChange = () => {
    if (this.props.showFavourites) {
      localStorage.setItem(this.cardName, `${!this.state.favourite}`);
      this.setState((prev) => ({
        favourite: !prev.favourite,
      }));
    }
  };

  componentDidMount(): void {
    if (this.props.showFavourites) {
      const value = localStorage.getItem(this.cardName);
      const result = value ? (value === 'true' ? true : false) : false;
      this.setState({ favourite: result });

      window.addEventListener('beforeunload', () => {
        localStorage.setItem(this.cardName, `${this.state.favourite}`);
      });
    }
  }

  componentWillUnmount(): void {
    if (this.props.showFavourites) {
      window.removeEventListener('beforeunload', () => {
        localStorage.setItem(this.cardName, `${this.state.favourite}`);
      });
    }
  }

  render() {
    const { id, name, description, breed, meals, gender, cuteness, image } = this.props;

    return (
      <div className="card__wrapper">
        <img
          data-testid={`image-${id}`}
          src={image || noImage}
          alt={name}
          className="card__image"
        />
        <div className="card__info">
          <h3 className="card__title">{name}</h3>
          <p className="card__breed">{breed}</p>
          <p className="card__text">{description}</p>
          {meals && <p className="card__text">Favourite meals: {meals}</p>}
          <p className="card__gender">{gender}</p>
          <div className="card__rating">
            <Rating size={35} cuteness={cuteness} />
          </div>
          {this.props.showFavourites && (
            <button
              data-testid={`star-button-${id}`}
              type="button"
              className="card__button"
              onClick={() => {
                this.handleFavouriteChange();
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
                className={`card__button_icon ${this.state.favourite ? 'favourite' : ''}`}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
          )}
          {this.props.isRemovable && (
            <button
              type="button"
              className="delete-button"
              onClick={() => {
                if (this.props.onDelete) {
                  this.props.onDelete(id);
                }
              }}
            >
              <img className="delete-button-icon" src={trashIcon} alt="Delete" />
            </button>
          )}
        </div>
      </div>
    );
  }
}
