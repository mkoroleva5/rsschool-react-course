import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import './CatsPage.css';
import catImage from '../../assets/images/cat.jpg';
import { Card, CardProps } from '../CardComponent/Card';
import { TextInput } from '../basicComponents/TextInput';
import { SelectInput } from '../basicComponents/SelectInput';
import { DateInput } from '../basicComponents/DateInput';
import { RadioInput } from '../basicComponents/RadioInput';
import { RangeInput } from '../basicComponents/RangeInput';
import { FileInput } from '../basicComponents/FileInput';
import { CheckboxInput } from '../basicComponents/CheckboxInput';
import { Popup } from '../basicComponents/Popup';

interface FormStateProps {
  cats: CardProps[];
  imageSrc: string | ArrayBuffer;
}

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
  const {
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onBlur' });

  const getCatsList = () => {
    const catsList = localStorage.getItem('cats-list');

    try {
      return catsList ? (JSON.parse(catsList) as CardProps[]) : [];
    } catch (err) {
      localStorage.removeItem('cats-list');
      return [];
    }
  };

  const [isCreated, setIsCreated] = useState(false);
  const [state, setState] = useState<FormStateProps>({
    cats: getCatsList(),
    imageSrc: '',
  });

  useEffect(() => {
    localStorage.setItem('cats-list', JSON.stringify(state.cats));
  }, [state]);

  const addCat = (cat: CardProps) => {
    setState({ ...state, cats: [...state.cats, cat] });
    localStorage.setItem('cats-list', JSON.stringify(state.cats));
  };

  const onSubmit = (data: FieldValues) => {
    setIsCreated(true);
    addCat({
      id: state.cats.length ? state.cats[state.cats.length - 1].id + 1 : 1,
      name: data.name || '',
      breed: data.breed,
      description: `Date of birth: ${data.date.split('-').reverse().join('.')}` || '',
      gender: data.gender,
      cuteness: data.cuteness,
      meals: data.meals.join(', '),
      image: state.imageSrc ? `${state.imageSrc}` : catImage,
    });
    reset();
  };

  const handleUpload = (value: string | ArrayBuffer) => {
    setState({ ...state, imageSrc: value });
  };

  const handleClose = () => {
    setIsCreated(false);
  };

  const handleDelete = (id: number) => {
    const deletedCatIndex = state.cats.findIndex((el) => el.id === id);
    setState({ ...state, cats: state.cats.filter((_, i) => i !== deletedCatIndex) });
    localStorage.setItem('cats-list', JSON.stringify(state.cats));
  };

  return (
    <div className="cats__wrapper">
      {isCreated && <Popup onClick={handleClose} />}
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
          <FileInput label="file" register={register} errors={errors} onUpload={handleUpload} />
          <input className="cats__form_submit" type="submit" value="Create" />
        </form>
      </section>
      <section className="cats__list_wrapper">
        {state.cats.map((cat: CardProps) => {
          return (
            <Card
              key={`${cat.name}-${cat.id}`}
              {...cat}
              showFavourites={false}
              isRemovable={true}
              onDelete={handleDelete}
            />
          );
        })}
      </section>
    </div>
  );
};
