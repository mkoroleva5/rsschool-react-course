import { ChangeEvent, useState } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPageComponent/CatsPage';
import './SelectInput.css';
import { Tooltip } from '../Tooltip';

interface SelectInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const SelectInput = ({ label, register, errors }: SelectInputProps) => {
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="form__item">
      <select
        className={`form__select ${!isValid ? 'invalid' : ''}`}
        id="breed"
        {...register(label, {
          required: 'Select a breed',
        })}
        onChange={(e) => {
          handleChange(e);
        }}
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
        {label}
      </label>
      {errors?.breed && <Tooltip message={errors?.breed?.message || 'Error'} />}
    </div>
  );
};
