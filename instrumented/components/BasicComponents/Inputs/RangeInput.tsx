import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPage/CatsPage';
import './RangeInput.css';
import { Rating } from '../Rating';

interface RangeInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  onSubmitSuccess: boolean;
}

export const RangeInput = ({ label, register, onSubmitSuccess }: RangeInputProps) => {
  const [cuteness, setCuteness] = useState(50);

  useEffect(() => {
    if (onSubmitSuccess) {
      setCuteness(50);
    }
  }, [onSubmitSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCuteness(Number(value));
  };
  return (
    <div className="form__range">
      <label className="form__range_label" htmlFor="cuteness">
        {label}
      </label>
      <Rating size={70} cuteness={cuteness} />
      <input
        className="form__range_slider"
        type="range"
        id="cuteness"
        {...register(label, {
          required: 'Select a breed',
          min: 0,
          max: 100,
        })}
        onChange={(e) => {
          handleChange(e);
        }}
      ></input>
    </div>
  );
};
