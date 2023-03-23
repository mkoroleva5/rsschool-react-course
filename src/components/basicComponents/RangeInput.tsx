import React from 'react';
import './RangeInput.css';
import { Rating } from './Rating';

interface RangeInputProps {
  cuteness: number;
  inputRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string) => void;
}

export class RangeInput extends React.Component<RangeInputProps> {
  render() {
    return (
      <div className="form__range">
        <label className="form__range_label" htmlFor="cuteness">
          Cuteness
        </label>
        <Rating size={70} cuteness={this.props.cuteness} />
        <input
          className="form__range_slider"
          type="range"
          id="cuteness"
          min="0"
          max="100"
          ref={this.props.inputRef}
          onChange={(e) => {
            const { value } = e.target;
            this.props.onInputChange(value);
          }}
        ></input>
      </div>
    );
  }
}
