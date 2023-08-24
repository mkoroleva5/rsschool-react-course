import './Rating.css';

interface RatingProps {
  cuteness: number;
  size: number;
  testId?: string;
}

export const Rating = ({ cuteness, size, testId }: RatingProps) => {
  return (
    <div data-testid={testId} className="heart-ratings" style={{ fontSize: `${size}px` }}>
      <div className="fill-ratings" data-testid="rating" style={{ width: `${cuteness}%` }}>
        <span>♥♥♥♥♥</span>
      </div>
      <div className="empty-ratings">
        <span>♥♥♥♥♥</span>
      </div>
    </div>
  );
};
