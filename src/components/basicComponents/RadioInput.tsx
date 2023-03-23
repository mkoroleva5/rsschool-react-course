import React from 'react';
import './RadioInput.css';

interface RadioInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  gender: string;
  onInputChange: (value: string) => void;
}

export class RadioInput extends React.Component<RadioInputProps> {
  render() {
    return (
      <div className="form__gender_wrapper">
        <div className="form__gender">
          <input
            className="form__gender_input"
            type="radio"
            id="male"
            name="gender"
            ref={this.props.inputRef}
            onChange={() => {
              this.props.onInputChange('M');
            }}
            required
          ></input>
          <label
            className={`form__gender_label ${this.props.gender === 'M' ? 'active-gender' : ''}`}
            htmlFor="male"
          >
            Male
          </label>
        </div>
        <div className="form__gender">
          <input
            className="form__gender_input"
            type="radio"
            id="female"
            name="gender"
            ref={this.props.inputRef}
            onChange={() => {
              this.props.onInputChange('F');
            }}
            required
          ></input>
          <label
            className={`form__gender_label ${this.props.gender === 'F' ? 'active-gender' : ''}`}
            htmlFor="female"
          >
            Female
          </label>
        </div>
      </div>
    );
  }
}
