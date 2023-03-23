import React from 'react';
import './Rating.css';

interface RatingProps {
  cuteness: number;
  size: number;
}

export class Rating extends React.Component<RatingProps> {
  render() {
    return (
      <div className="heart-ratings" style={{ fontSize: `${this.props.size}px` }}>
        <div
          className="fill-ratings"
          data-testid="rating"
          style={{ width: `${this.props.cuteness}%` }}
        >
          <span>♥♥♥♥♥</span>
        </div>
        <div className="empty-ratings">
          <span>♥♥♥♥♥</span>
        </div>
      </div>
    );
  }
}
