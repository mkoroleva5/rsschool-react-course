import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFormValues } from '../../CatsPageComponent/CatsPage';
import './FileInput.css';
import { Tooltip } from '../Tooltip';

interface FileInputProps {
  label: Path<IFormValues>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  onUpload: (value: string | ArrayBuffer) => void;
}

export const FileInput = ({ label, register, errors, onUpload }: FileInputProps) => {
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
              onUpload(base64String);
            }
          };
          reader.readAsDataURL(file);
        }}
      ></input>
      {errors?.file && <Tooltip message={errors?.file?.message || 'Error'} />}
    </div>
  );
};
