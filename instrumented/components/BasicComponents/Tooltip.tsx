import { FieldError, FieldErrorsImpl, FieldValues, Merge } from 'react-hook-form';
import './Tooltip.css';

interface TooltipProps {
  className?: string;
  message: string | FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
}

export const Tooltip = ({ className, message }: TooltipProps) => {
  return (
    <div className={`error ${className || ''}`}>
      <div className="error-text">{`${message}`}</div>
    </div>
  );
};
