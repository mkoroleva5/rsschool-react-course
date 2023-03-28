import { IFormValues } from '../CatsPageComponent/CatsPage';
import { ChangeEvent, useState } from 'react';
import { FieldValues, UseFormRegister, Path, FieldErrors } from 'react-hook-form';

import './TextInput.css';
import { Tooltip } from './Tooltip';

interface TextInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const TextInput = ({ label, register, errors }: TextInputProps) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      setIsEmpty(false);
      if (value.length < 3 || value.length > 12) {
        setIsValid(false);
      } else if (value[0].toUpperCase() !== value[0]) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } else {
      setIsEmpty(true);
      setIsValid(false);
    }
  };

  return (
    <div className="form__text">
      <input
        id="name"
        className={`form__input ${isEmpty ? 'empty' : ''} ${!isValid ? 'invalid' : ''}`}
        {...register(label, {
          required: 'Enter a name',
          pattern: {
            value: /^[A-ZА-Я][a-zA-Zа-яА-Я]/,
            message:
              'The name must start with a capital letter and be between 3 and 12 characters long',
          },
          minLength: {
            value: 3,
            message:
              'The name must start with a capital letter and be between 3 and 12 characters long',
          },
          maxLength: {
            value: 12,
            message:
              'The name must start with a capital letter and be between 3 and 12 characters long',
          },
        })}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <label className={`form__label ${isEmpty ? 'empty' : ''}`} htmlFor="name">
        {label}
      </label>
      {errors?.name && <Tooltip message={errors?.name?.message || 'Error'} />}
    </div>
  );
};
