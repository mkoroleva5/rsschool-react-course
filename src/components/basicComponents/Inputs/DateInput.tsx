import { ChangeEvent, useState } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPageComponent/CatsPage';
import './DateInput.css';
import { Tooltip } from '../Tooltip';

interface DateInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const DateInput = ({ label, register, errors }: DateInputProps) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value || value > currentDate) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className="form__date">
      <label className="form__date-label" htmlFor="date">
        date of birth
      </label>
      <input
        className={`form__date-input ${!isValid ? 'invalid' : ''}`}
        type="date"
        id="date"
        {...register(label, {
          required: 'Enter a date of birth',
          max: {
            value: currentDate,
            message: `Max value must be ${currentDate.split('-').reverse().join('.')}`,
          },
        })}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
      {errors?.date && <Tooltip message={errors?.date?.message || 'Error'} />}
    </div>
  );
};
