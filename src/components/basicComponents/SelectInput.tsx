import React from 'react';
import './SelectInput.css';
import { Tooltip } from './Tooltip';

interface SelectInputProps {
  isSubmitted: boolean;
  inputRef: React.RefObject<HTMLSelectElement>;
  onInputChange: (value: string) => void;
}

export class SelectInput extends React.Component<SelectInputProps> {
  render() {
    return (
      <div className="form__item">
        <select
          className={`form__select ${!this.props.inputRef.current?.value ? 'invalid' : ''}`}
          ref={this.props.inputRef}
          onChange={(e) => {
            const { value } = e.target;
            this.props.onInputChange(value);
          }}
          id="breed"
        >
          <option value="">Select a breed</option>
          <option className="form__select_option" value="Persian">
            Persian
          </option>
          <option className="form__select_option" value="Maine Coon">
            Maine Coon
          </option>
          <option className="form__select_option" value="Siamese">
            Siamese
          </option>
          <option className="form__select_option" value="British Shorthair">
            British Shorthair
          </option>
          <option className="form__select_option" value="Abyssinian">
            Abyssinian
          </option>
          <option className="form__select_option" value="Siberian">
            Siberian
          </option>
        </select>
        <label className="form__select_label" htmlFor="breed">
          Breed
        </label>
        {this.props.isSubmitted && !this.props.inputRef.current?.value && (
          <Tooltip message="Select a breed" />
        )}
      </div>
    );
  }
}
