import React, { ChangeEvent } from 'react';
import './TextInput.css';
import { Tooltip } from './Tooltip';

interface TextInputProps {
  isSubmitted: boolean;
  isNameEmpty: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export class TextInput extends React.Component<TextInputProps> {
  checkValidity() {
    if (
      this.props.inputRef.current!.value.length < 3 ||
      this.props.inputRef.current!.value.length > 12
    ) {
      return false;
    } else if (
      this.props.inputRef.current!.value[0].toUpperCase() !== this.props.inputRef.current!.value[0]
    ) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="form__text">
        <input
          className={`form__input ${this.props.isNameEmpty ? 'empty' : ''} ${
            this.props.inputRef.current?.value && !this.checkValidity() ? 'invalid' : ''
          }`}
          type="text"
          title="The name must start with a capital letter and be between 3 and 12 characters long"
          id="name"
          ref={this.props.inputRef}
          onChange={(e) => {
            this.props.onInputChange(e);
          }}
        ></input>
        <label className={`form__label ${this.props.isNameEmpty ? 'empty' : ''}`} htmlFor="name">
          Name
        </label>
        {this.props.isSubmitted && !this.props.inputRef.current?.value && (
          <Tooltip message="Enter a name" />
        )}
        {this.props.isSubmitted && this.props.inputRef.current?.value && !this.checkValidity() && (
          <Tooltip message="The name must start with a capital letter and be between 3 and 12 characters long" />
        )}
      </div>
    );
  }
}
