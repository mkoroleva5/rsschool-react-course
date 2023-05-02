import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import './CatsPage.css';
import catImage from '../../assets/images/cat.jpg';
import { addCat, uploadImage } from '../../store/catsSlice';
import { Card, CardProps } from '../Card/Card';
import { TextInput } from '../BasicComponents/Inputs/TextInput';
import { SelectInput } from '../BasicComponents/Inputs/SelectInput';
import { DateInput } from '../BasicComponents/Inputs/DateInput';
import { RadioInput } from '../BasicComponents/Inputs/RadioInput';
import { RangeInput } from '../BasicComponents/Inputs/RangeInput';
import { FileInput } from '../BasicComponents/Inputs/FileInput';
import { CheckboxInput } from '../BasicComponents/Inputs/CheckboxInput';
import { Popup } from '../BasicComponents/Popup';
import { Modal } from '../BasicComponents/Modal';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

export interface IFormValues {
  name: string;
  breed: string;
  date: string;
  gender: string | null;
  cuteness: number;
  meals: string[];
  file: string | ArrayBuffer;
}

export const CatsPage = () => {
  const cats = useAppSelector((state: RootState) => state.cats.cats);
  const stateImage = useAppSelector((state: RootState) => state.cats.image);
  const dispatch = useAppDispatch();

  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const [isCreated, setIsCreated] = useState(false);
  const [openedId, setOpenedId] = useState<number | null>(null);

  const onSubmit = (data: FieldValues) => {
    setIsCreated(true);

    dispatch(
      addCat({
        id: cats.length ? cats[cats.length - 1].id + 1 : 1,
        name: data.name || '',
        breed: data.breed,
        description: `Date of birth: ${data.date.split('-').reverse().join('.')}` || '',
        gender: data.gender,
        cuteness: data.cuteness,
        info: `Favourite meals: ${data.meals.join(', ')}`,
        image: stateImage ? `${stateImage}` : catImage,
      })
    );

    dispatch(uploadImage({ image: '' }));
    reset();
  };

  useEffect(() => {
    localStorage.setItem('cats-list', JSON.stringify(cats));
  }, [cats]);

  const handleModalOpening = (id: number) => {
    setOpenedId(id);
  };

  const handleModalClosing = () => {
    setOpenedId(null);
  };

  const handlePopupClosing = () => {
    setIsCreated(false);
  };

  return (
    <div className="cats__wrapper">
      {isCreated && <Popup onClick={handlePopupClosing} />}
      <section className="cats__form_wrapper">
        <h1>Create your own cat</h1>
        <form data-testid="form" className="cats__form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="name"
            register={register}
            errors={errors}
            onSubmitSuccess={isSubmitSuccessful}
          />
          <SelectInput label="breed" register={register} errors={errors} />
          <DateInput label="date" register={register} errors={errors} />
          <RadioInput label="gender" register={register} watch={watch} errors={errors} />
          <RangeInput label="cuteness" register={register} onSubmitSuccess={isSubmitSuccessful} />
          <CheckboxInput label="meals" register={register} errors={errors} />
          <FileInput label="file" register={register} errors={errors} />
          <input className="cats__form_submit" type="submit" value="Create" />
        </form>
      </section>
      <section className="cats__list_wrapper" data-testid="cats-wrapper">
        {cats.map((cat: CardProps) => {
          return (
            <Card
              key={`${cat.name}-${cat.id}`}
              {...cat}
              page="cats"
              isRemovable={true}
              onOpening={handleModalOpening}
            />
          );
        })}
        {openedId !== null && <Modal page="cats" id={openedId} onClose={handleModalClosing} />}
      </section>
    </div>
  );
};
