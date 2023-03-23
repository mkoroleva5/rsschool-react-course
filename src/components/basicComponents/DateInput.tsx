import React from 'react';
import './DateInput.css';

interface DateInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
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
          className="form__date-input"
          type="date"
          id="date"
          max={this.currentDate}
          ref={this.props.inputRef}
          required
        ></input>
      </div>
    );
  }
}
