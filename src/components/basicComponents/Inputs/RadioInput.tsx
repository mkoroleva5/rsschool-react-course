import { FieldErrors, FieldValues, Path, UseFormRegister, WatchInternal } from 'react-hook-form';
import { IFormValues } from '../../CatsPage/CatsPage';
import './RadioInput.css';
import { Tooltip } from '../Tooltip';

interface RadioInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  watch: WatchInternal<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const RadioInput = ({ label, register, watch, errors }: RadioInputProps) => {
  const currentGender = watch('gender');

  return (
    <div className="form__gender_wrapper">
      <div className="form__gender">
        <input
          className="form__gender_input"
          type="radio"
          id="male"
          value="M"
          {...register(label, {
            required: 'Select a gender',
          })}
        ></input>
        <label
          className={`form__gender_label ${currentGender === 'M' ? 'active-gender' : ''}`}
          htmlFor="male"
        >
          male
        </label>
      </div>
      <div className="form__gender">
        <input
          className="form__gender_input"
          type="radio"
          id="female"
          value="F"
          {...register(label, {
            required: 'Select a gender',
          })}
        ></input>
        <label
          className={`form__gender_label ${currentGender === 'F' ? 'active-gender' : ''}`}
          htmlFor="female"
        >
          female
        </label>
      </div>
      {errors?.gender && (
        <Tooltip className="gender-error" message={errors?.gender?.message || 'Error'} />
      )}
    </div>
  );
};
