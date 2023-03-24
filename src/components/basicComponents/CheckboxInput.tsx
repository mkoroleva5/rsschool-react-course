import React, { ChangeEvent } from 'react';
import './CheckboxInput.css';

interface CheckboxInputProps {
  inputFishRef: React.RefObject<HTMLInputElement>;
  inputMeatRef: React.RefObject<HTMLInputElement>;
  inputMilkRef: React.RefObject<HTMLInputElement>;
  onInputChange: (value: string[]) => void;
}

interface CheckboxInputStateProps {
  meals: string[];
}

export class CheckboxInput extends React.Component<CheckboxInputProps, CheckboxInputStateProps> {
  state = {
    meals: [],
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.checked) {
      this.setState((prevState) => ({
        meals: [...prevState.meals, value],
      }));
    } else {
      this.setState((prevState) => ({
        meals: prevState.meals.filter((v: string) => v !== value),
      }));
    }
  };

  componentDidUpdate(
    prevProps: Readonly<CheckboxInputProps>,
    prevState: Readonly<CheckboxInputStateProps>
  ) {
    if (this.state.meals !== prevState.meals) {
      this.props.onInputChange(this.state.meals);
    }
  }

  render() {
    return (
      <div className="form__checkbox">
        <div className="option">
          <input
            className="form__checkbox_input"
            type="checkbox"
            id="fish"
            value="Fish"
            ref={this.props.inputFishRef}
            onChange={(e) => {
              this.handleChange(e);
            }}
          ></input>
          <label className="form__checkbox_label" htmlFor="fish">
            <div className="checkbox" />
            <div className="option-label">Fish</div>
          </label>
        </div>
        <div className="option">
          <input
            className="form__checkbox_input"
            type="checkbox"
            id="meat"
            value="Meat"
            ref={this.props.inputMeatRef}
            onChange={(e) => {
              this.handleChange(e);
            }}
          ></input>
          <label className="form__checkbox_label" htmlFor="meat">
            <div className="checkbox" />
            <div className="option-label">Meat</div>
          </label>
        </div>
        <div className="option">
          <input
            className="form__checkbox_input"
            type="checkbox"
            id="milk"
            value="Milk"
            ref={this.props.inputMilkRef}
            onChange={(e) => {
              this.handleChange(e);
            }}
          ></input>
          <label className="form__checkbox_label" htmlFor="milk">
            <div className="checkbox" />
            <div className="option-label">Milk</div>
          </label>
        </div>
      </div>
    );
  }
}