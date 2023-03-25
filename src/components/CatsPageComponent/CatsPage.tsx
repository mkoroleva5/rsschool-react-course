import React, { ChangeEvent } from 'react';
import './CatsPage.css';
import { Card } from '../../components/CardComponent/Card';
import catImage from '../../assets/images/cat.jpg';
import { TextInput } from '../../components/basicComponents/TextInput';
import { SelectInput } from '../../components/basicComponents/SelectInput';
import { DateInput } from '../../components/basicComponents/DateInput';
import { RadioInput } from '../../components/basicComponents/RadioInput';
import { RangeInput } from '../../components/basicComponents/RangeInput';
import { FileInput } from '../../components/basicComponents/FileInput';
import { CheckboxInput } from '../../components/basicComponents/CheckboxInput';

interface CatProps {
  id: number;
  name: string;
  breed: string;
  description: string;
  gender: string;
  cuteness: number;
  meals?: string;
  image: string;
}

interface CatsStateProps {
  cats: CatProps[];
  gender: string;
  breed: string;
  cuteness: number;
  meals: string;
  image: string | ArrayBuffer;
  isNameEmpty: boolean;
  isValid: boolean;
  isSubmitted: boolean;
}

export class CatsPage extends React.Component<Record<string, never>, CatsStateProps> {
  inputNameRef = React.createRef<HTMLInputElement>();
  inputSelectRef = React.createRef<HTMLSelectElement>();
  inputDateRef = React.createRef<HTMLInputElement>();
  inputMaleRef = React.createRef<HTMLInputElement>();
  inputFemaleRef = React.createRef<HTMLInputElement>();
  inputCutenessRef = React.createRef<HTMLInputElement>();
  inputCheckboxesRef = React.createRef<CheckboxInput>();
  inputFishRef = React.createRef<HTMLInputElement>();
  inputMeatRef = React.createRef<HTMLInputElement>();
  inputMilkRef = React.createRef<HTMLInputElement>();
  inputFileRef = React.createRef<HTMLInputElement>();

  constructor(props: Record<string, never>) {
    super(props);

    const getCatsList = () => {
      const catsList = localStorage.getItem('cats-list');

      try {
        return catsList ? (JSON.parse(catsList) as CatProps[]) : [];
      } catch (err) {
        localStorage.removeItem('cats-list');
        return [];
      }
    };

    this.state = {
      cats: getCatsList(),
      gender: '',
      breed: '',
      cuteness: 50,
      meals: '',
      image: catImage,
      isNameEmpty: true,
      isValid: false,
      isSubmitted: false,
    };
  }

  checkValidity() {
    if (
      !this.inputNameRef.current?.value ||
      !this.inputSelectRef.current?.value ||
      !this.inputDateRef.current?.value ||
      (this.inputMaleRef.current!.checked === false &&
        this.inputFemaleRef.current!.checked === false) ||
      (this.inputFishRef.current!.checked === false &&
        this.inputMeatRef.current!.checked === false &&
        this.inputMilkRef.current!.checked === false) ||
      !this.inputFileRef.current?.value
    ) {
      this.setState(() => ({
        isValid: false,
      }));
    } else {
      this.setState(() => ({
        isValid: true,
      }));
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState(() => ({
      isSubmitted: true,
    }));

    if (this.state.isValid === true) {
      this.addCat({
        id: this.state.cats.length ? this.state.cats[this.state.cats.length - 1].id + 1 : 1,
        name: this.inputNameRef.current?.value || '',
        breed: this.state.breed,
        description: `Date of birth: ${this.inputDateRef.current?.value}` || '',
        gender: this.state.gender,
        cuteness: this.state.cuteness,
        meals: this.state.meals,
        image: `${this.state.image}`,
      });

      setTimeout(() => alert('The cat has been created!'), 100);
      this.inputNameRef.current!.value = '';
      this.inputSelectRef.current!.value = '';
      this.inputDateRef.current!.value = '';
      this.inputMaleRef.current!.checked = false;
      this.inputFemaleRef.current!.checked = false;
      this.inputFishRef.current!.checked = false;
      this.inputMeatRef.current!.checked = false;
      this.inputMilkRef.current!.checked = false;
      this.inputFileRef.current!.value = '';
      this.inputCheckboxesRef.current!.clearState();
      this.setState(() => ({
        gender: '',
        cuteness: 50,
        meals: '',
        isNameEmpty: true,
        isValid: false,
        isSubmitted: false,
      }));
    }
  }

  addCat(cat: CatProps) {
    this.setState((prevState: CatsStateProps) => ({
      cats: [...prevState.cats, cat],
    }));
    localStorage.setItem('cats-list', JSON.stringify(this.state.cats));
  }

  componentDidMount(): void {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('cats-list', JSON.stringify(this.state.cats));
    });
  }

  componentWillUnmount(): void {
    window.removeEventListener('beforeunload', () => {
      localStorage.setItem('cats-list', JSON.stringify(this.state.cats));
    });
    localStorage.setItem('cats-list', JSON.stringify(this.state.cats));
  }

  handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value) {
      this.setState(() => ({
        isNameEmpty: false,
      }));
    } else {
      this.setState(() => ({
        isNameEmpty: true,
      }));
    }
    this.checkValidity();
  };

  handleBreedChange = (option: string) => {
    this.setState(() => ({
      breed: option,
    }));
    this.checkValidity();
  };

  handleDateChange = () => {
    this.checkValidity();
  };

  handleGenderChange = (gender: string) => {
    this.setState(() => ({
      gender,
    }));
    this.checkValidity();
  };

  handleCutenessChange = (value: string) => {
    this.setState(() => ({
      cuteness: Number(value),
    }));
    this.checkValidity();
  };

  handleCheckboxChange = (value: string[]) => {
    this.setState(() => ({
      meals: value.join(', '),
    }));
    this.checkValidity();
  };

  handleImageUpload = (value: string | ArrayBuffer) => {
    if (value) {
      this.setState(() => ({
        image: value,
      }));
    }
    this.checkValidity();
  };

  handleDelete = (id: number) => {
    const deletedCatIndex = this.state.cats.findIndex((el) => el.id === id);
    this.setState((prevState: CatsStateProps) => ({
      cats: prevState.cats.filter((_, i) => i !== deletedCatIndex),
    }));
    localStorage.setItem('cats-list', JSON.stringify(this.state.cats));
  };

  render() {
    return (
      <div className="cats__wrapper">
        <section className="cats__form_wrapper">
          <h1>Create your own cat</h1>
          <form
            data-testid="form"
            className="cats__form"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <TextInput
              isSubmitted={this.state.isSubmitted}
              isNameEmpty={this.state.isNameEmpty}
              inputRef={this.inputNameRef}
              onInputChange={this.handleNameChange}
            />
            <SelectInput
              isSubmitted={this.state.isSubmitted}
              inputRef={this.inputSelectRef}
              onInputChange={this.handleBreedChange}
            />
            <DateInput
              isSubmitted={this.state.isSubmitted}
              inputRef={this.inputDateRef}
              onInputChange={this.handleDateChange}
            />
            <RadioInput
              isSubmitted={this.state.isSubmitted}
              inputMaleRef={this.inputMaleRef}
              inputFemaleRef={this.inputFemaleRef}
              gender={this.state.gender}
              onInputChange={this.handleGenderChange}
            />
            <RangeInput
              cuteness={this.state.cuteness}
              inputRef={this.inputCutenessRef}
              onInputChange={this.handleCutenessChange}
            />
            <CheckboxInput
              ref={this.inputCheckboxesRef}
              isSubmitted={this.state.isSubmitted}
              inputFishRef={this.inputFishRef}
              inputMeatRef={this.inputMeatRef}
              inputMilkRef={this.inputMilkRef}
              onInputChange={this.handleCheckboxChange}
            />
            <FileInput
              isSubmitted={this.state.isSubmitted}
              inputRef={this.inputFileRef}
              onInputChange={this.handleImageUpload}
            />
            <button className="cats__form_submit" type="submit">
              Create
            </button>
          </form>
        </section>
        <section className="cats__list_wrapper">
          {this.state.cats.map((cat: CatProps) => {
            return (
              <Card
                key={`${cat.name}-${cat.id}`}
                {...cat}
                showFavourites={false}
                isRemovable={true}
                onDelete={this.handleDelete}
              />
            );
          })}
        </section>
      </div>
    );
  }
}
