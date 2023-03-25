import React from 'react';
import './RadioInput.css';
import { Tooltip } from './Tooltip';

interface RadioInputProps {
  isSubmitted: boolean;
  inputMaleRef: React.RefObject<HTMLInputElement>;
  inputFemaleRef: React.RefObject<HTMLInputElement>;
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
            ref={this.props.inputMaleRef}
            onChange={() => {
              this.props.onInputChange('M');
            }}
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
            ref={this.props.inputFemaleRef}
            onChange={() => {
              this.props.onInputChange('F');
            }}
          ></input>
          <label
            className={`form__gender_label ${this.props.gender === 'F' ? 'active-gender' : ''}`}
            htmlFor="female"
          >
            Female
          </label>
        </div>
        {this.props.isSubmitted &&
          this.props.inputMaleRef.current?.checked === false &&
          this.props.inputFemaleRef.current?.checked === false && (
            <Tooltip className="gender-error" message="Select a gender" />
          )}
      </div>
    );
  }
}
