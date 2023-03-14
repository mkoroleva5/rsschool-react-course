import React from 'react';
import './Card.css';
import noImage from '../../assets/images/default.jpg';

interface CardProps {
  id: number;
  name: string;
  description: string;
  breed: string;
  gender: string;
  cuteness: number;
  image: string;
}

interface CardState {
  favourite: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
  state = {
    favourite: false,
  };

  handleFavouriteChange = () => {
    localStorage.setItem(`card-${this.props.id}`, JSON.stringify(!this.state.favourite));
    this.setState((prev) => ({
      favourite: !prev.favourite,
    }));
  };

  componentDidMount(): void {
    const value = localStorage.getItem(`card-${this.props.id}`);
    const result = value ? JSON.parse(value) : false;
    this.setState({ favourite: result });

    window.addEventListener('beforeunload', () => {
      localStorage.setItem(`card-${this.props.id}`, JSON.stringify(this.state.favourite));
    });
  }

  render() {
    const { name, description, breed, gender, cuteness, image } = this.props;

    return (
      <div className="card__wrapper">
        <img src={image || noImage} alt={name} className="card__image" />
        <div className="card__info">
          <h3 className="card__title">{name}</h3>
          <p className="card__breed">{breed}</p>
          <p className="card__text">{description}</p>
          <p className="card__gender">{gender}</p>
          <div className="card__rating">
            <div className="heart-ratings">
              <div className="fill-ratings" data-testid="rating" style={{ width: `${cuteness}%` }}>
                <span>♥♥♥♥♥</span>
              </div>
              <div className="empty-ratings">
                <span>♥♥♥♥♥</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="card__button"
            onClick={() => {
              this.handleFavouriteChange();
            }}
          >
            <svg
              data-testid="star-svg"
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
        </div>
      </div>
    );
  }
}
