import './Rating.css';

interface RatingProps {
  cuteness: number;
  size: number;
}

export const Rating = ({ cuteness, size }: RatingProps) => {
  return (
    <div className="heart-ratings" style={{ fontSize: `${size}px` }}>
      <div className="fill-ratings" data-testid="rating" style={{ width: `${cuteness}%` }}>
        <span>♥♥♥♥♥</span>
      </div>
      <div className="empty-ratings">
        <span>♥♥♥♥♥</span>
      </div>
    </div>
  );
};
