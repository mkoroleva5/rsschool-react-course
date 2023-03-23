import React, { ChangeEvent } from 'react';
import './TextInput.css';

interface TextInputProps {
  isNameEmpty: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class TextInput extends React.Component<TextInputProps> {
  render() {
    return (
      <div className="form__text">
        <input
          className={`form__input ${this.props.isNameEmpty ? 'empty' : ''}`}
          type="text"
          pattern="[A-ZА-Я]([a-zA-Zа-яА-Я]{3,11})"
          title="The name must start with a capital letter and be between 3 and 12 characters long"
          id="name"
          ref={this.props.inputRef}
          onChange={(e) => {
            this.props.onInputChange(e);
          }}
          required
        ></input>
        <label className={`form__label ${this.props.isNameEmpty ? 'empty' : ''}`} htmlFor="name">
          Name
        </label>
      </div>
    );
  }
}
