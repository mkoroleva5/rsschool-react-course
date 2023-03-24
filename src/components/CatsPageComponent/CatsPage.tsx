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
}

export class CatsPage extends React.Component<Record<string, never>, CatsStateProps> {
  inputNameRef = React.createRef<HTMLInputElement>();
  inputSelectRef = React.createRef<HTMLSelectElement>();
  inputDateRef = React.createRef<HTMLInputElement>();
  inputGenderRef = React.createRef<HTMLInputElement>();
  inputCutenessRef = React.createRef<HTMLInputElement>();
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
    };
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    this.inputGenderRef.current!.checked = false;
    this.inputFishRef.current!.checked = false;
    this.inputMeatRef.current!.checked = false;
    this.inputMilkRef.current!.checked = false;
    this.inputFileRef.current!.value = '';
    this.setState(() => ({
      gender: '',
      cuteness: 50,
      meals: '',
      isNameEmpty: true,
    }));
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
  };

  handleBreedChange = (option: string) => {
    this.setState(() => ({
      breed: option,
    }));
  };

  handleGenderChange = (gender: string) => {
    this.setState(() => ({
      gender,
    }));
  };

  handleCutenessChange = (value: string) => {
    this.setState(() => ({
      cuteness: Number(value),
    }));
  };

  handleCheckboxChange = (value: string[]) => {
    this.setState(() => ({
      meals: value.join(', '),
    }));
  };

  handleImageUpload = (value: string | ArrayBuffer) => {
    if (value) {
      this.setState(() => ({
        image: value,
      }));
    }
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
            className="cats__form"
            onSubmit={(e) => {
              this.handleSubmit(e);
            }}
          >
            <TextInput
              isNameEmpty={this.state.isNameEmpty}
              inputRef={this.inputNameRef}
              onInputChange={this.handleNameChange}
            />
            <SelectInput inputRef={this.inputSelectRef} onInputChange={this.handleBreedChange} />
            <DateInput inputRef={this.inputDateRef} />
            <RadioInput
              inputRef={this.inputGenderRef}
              gender={this.state.gender}
              onInputChange={this.handleGenderChange}
            />
            <RangeInput
              cuteness={this.state.cuteness}
              inputRef={this.inputCutenessRef}
              onInputChange={this.handleCutenessChange}
            />
            <CheckboxInput
              inputFishRef={this.inputFishRef}
              inputMeatRef={this.inputMeatRef}
              inputMilkRef={this.inputMilkRef}
              onInputChange={this.handleCheckboxChange}
            />
            <FileInput inputRef={this.inputFileRef} onInputChange={this.handleImageUpload} />
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
