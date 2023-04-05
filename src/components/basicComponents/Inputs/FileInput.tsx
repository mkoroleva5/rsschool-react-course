import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPage/CatsPage';
import './FileInput.css';
import { Tooltip } from '../Tooltip';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../../store/catsSlice';

interface FileInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const FileInput = ({ label, register, errors }: FileInputProps) => {
  const dispatch = useDispatch();

  return (
    <div className="form__item">
      <input
        data-testid="file-input"
        className="form__file"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        {...register(label, {
          required: 'Upload an image',
        })}
        onChange={(e) => {
          const file = e.target.files![0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64String = event.target!.result;
            if (base64String) {
              dispatch(uploadImage({ image: base64String }));
            }
          };
          reader.readAsDataURL(file);
        }}
      ></input>
      {errors?.file && <Tooltip message={errors?.file?.message || 'Error'} />}
    </div>
  );
};
