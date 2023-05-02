import './Spinner.css';

interface SpinnerProps {
  testId?: string;
}

export const Spinner = ({ testId }: SpinnerProps) => {
  return <div data-testid={testId} className="spinner" />;
};
