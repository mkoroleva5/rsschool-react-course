import { FieldErrors, FieldValues, Path, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../CatsPageComponent/CatsPage';
import './CheckboxInput.css';
import { Tooltip } from './Tooltip';

interface CheckboxInputProps {
  label1: Path<IFormValues>;
  label2: Path<IFormValues>;
  label3: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export const CheckboxInput = ({
  label1,
  label2,
  label3,
  register,
  errors,
  getValues,
}: CheckboxInputProps) => {
  const validateCheckbox = () => {
    const values = [getValues().fish, getValues().meat, getValues().milk];
    console.log(values);

    const isChecked = values.some((value) => value !== false);
    return isChecked || 'Select at least one meal';
  };

  return (
    <div className="form__checkbox">
      <div className="form__checkbox_title">favourite meals</div>
      <div className="form__checkbox_options">
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value={label1}
            {...register(label1, {
              validate: validateCheckbox,
            })}
          />
          <div className="checkbox"></div>
          {label1}
        </label>
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value={label2}
            {...register(label2, {
              validate: validateCheckbox,
            })}
          />
          <div className="checkbox"></div>
          {label2}
        </label>
        <label className="form__checkbox_label">
          <input
            className="form__checkbox_input"
            type="checkbox"
            value={label3}
            {...register(label3, {
              validate: validateCheckbox,
            })}
          />
          <div className="checkbox"></div>
          {label3}
        </label>
        {errors?.fish && (
          <Tooltip className="meals-error" message={errors?.fish?.message || 'Error'} />
        )}
      </div>
    </div>
  );
};
