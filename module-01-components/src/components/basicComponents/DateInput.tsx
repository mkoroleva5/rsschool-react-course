import React from 'react';
import './DateInput.css';

interface DateInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export class DateInput extends React.Component<DateInputProps> {
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
          ref={this.props.inputRef}
          required
        ></input>
      </div>
    );
  }
}
