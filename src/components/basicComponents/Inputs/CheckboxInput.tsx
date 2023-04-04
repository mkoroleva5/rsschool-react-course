import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPage/CatsPage';
import './CheckboxInput.css';
import { Tooltip } from '../Tooltip';

interface CheckboxInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const CheckboxInput = ({ label, register, errors }: CheckboxInputProps) => {
  return (
    <div className="form__checkbox">
      <div className="form__checkbox_title">favourite meals</div>
      <div className="form__checkbox_options">
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value="fish"
            {...register(label, {
              required: 'Select at least one meal',
            })}
          />
          <div className="checkbox"></div>
          fish
        </label>
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value="meat"
            {...register(label, {
              required: 'Select at least one meal',
            })}
          />
          <div className="checkbox"></div>
          meat
        </label>
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value="milk"
            {...register(label, {
              required: 'Select at least one meal',
            })}
          />
          <div className="checkbox"></div>
          milk
        </label>
        {errors?.meals && (
          <Tooltip className="meals-error" message={errors?.meals?.message || 'Error'} />
        )}
      </div>
    </div>
  );
};
