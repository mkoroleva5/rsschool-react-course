import React from 'react';
import './DateInput.css';
import { Tooltip } from './Tooltip';

interface DateInputProps {
  isSubmitted: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: () => void;
}

export class DateInput extends React.Component<DateInputProps> {
  currentDate = new Date().toISOString().split('T')[0];

  render() {
    return (
      <div className="form__date">
        <label className="form__date-label" htmlFor="date">
          Date of birth
        </label>
        <input
          className={`form__date-input ${!this.props.inputRef.current?.value ? 'invalid' : ''}`}
          type="date"
          id="date"
          max={this.currentDate}
          ref={this.props.inputRef}
          onChange={() => {
            this.props.onInputChange();
          }}
        ></input>
        {this.props.isSubmitted && !this.props.inputRef.current?.value && (
          <Tooltip message="Enter a date of birth" />
        )}
      </div>
    );
  }
}
