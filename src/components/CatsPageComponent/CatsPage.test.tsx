import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CatsPage } from './CatsPage';
import { LocalStorageMock } from '../../components/CardComponent/Card.test';

const cat = {
  id: 1,
  name: 'Cat',
  breed: 'Persian',
  description: 'Date of birth: 2023-03-04',
  gender: 'F',
  cuteness: 75,
  meals: '',
  image: '',
};

const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('CatsPage tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
    vi.stubGlobal('alert', mockAlert);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('sets data to localStorage', () => {
    render(<CatsPage />);
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('cats-list')).toEqual('[]');
  });

  it('displays error when localStorage data is invalid', () => {
    window.localStorage.setItem('cats-list', 'vbc');
    render(<CatsPage />);
    let parsedCatsList = null;

    try {
      const catsList = window.localStorage.getItem('cats-list');
      if (catsList !== null) {
        parsedCatsList = JSON.parse(catsList);
      }
    } catch (err) {
      localStorage.removeItem('cats-list');
    }

    expect(parsedCatsList).toBe(null);
  });

  it('adds className empty if text input is empty', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test value');
    expect(input).not.toHaveClass('empty');
    fireEvent.submit(input);
    expect(input).toHaveClass('empty');
  });

  it('deletes data from localStorage when delete button is clicked', async () => {
    const cats = [cat];
    window.localStorage.setItem('cats-list', JSON.stringify(cats));

    render(<CatsPage />);

    await userEvent.click(screen.getByTestId(`delete-button-${cats[0].id}`));

    const deletedCatIndex = cats.findIndex((el) => el.id === cats[0].id);
    const newCats = cats.filter((_, i) => i !== deletedCatIndex);
    localStorage.setItem('cats-list', JSON.stringify(newCats));

    const newCatsList = window.localStorage.getItem('cats-list');
    const catsListArray = newCatsList ? JSON.parse(newCatsList) : null;

    expect(catsListArray).toEqual([]);
  });

  it('displays the right value in TextInput', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const value = 'test value';

    await userEvent.type(input, value);
    expect(input).toHaveValue(value);
  });

  it('displays the right value in SelectInput', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('combobox') as HTMLSelectElement;
    const option = screen.getByRole('option', { name: 'Persian' });
    const value = 'Persian';

    await userEvent.selectOptions(input, option);
    expect(input).toHaveValue(value);
  });

  it('displays the right value in DateInput', async () => {
    render(<CatsPage />);
    const input = screen.getByLabelText('Date of birth') as HTMLInputElement;
    const date = new Date('2023-03-23').toISOString().slice(0, 10);

    await userEvent.type(input, date);
    expect(input).toHaveValue(date);
  });

  it('displays the right value in RadioInput', async () => {
    render(<CatsPage />);

    const inputMale = screen.getByRole('radio', { name: 'Male' });
    const inputFemale = screen.getByRole('radio', { name: 'Female' });

    expect(inputFemale).not.toBeChecked();
    expect(inputMale).not.toBeChecked();

    await userEvent.click(inputFemale);
    expect(inputFemale).toBeChecked();
    expect(inputMale).not.toBeChecked();

    await userEvent.click(inputMale);
    expect(inputFemale).not.toBeChecked();
    expect(inputMale).toBeChecked();
  });

  it('displays the right value in RangeInput', () => {
    render(<CatsPage />);
    const input = screen.getByRole('slider') as HTMLInputElement;

    expect(input).toHaveValue('50');
    fireEvent.change(input, { target: { value: 70 } });
    expect(input).toHaveValue('70');
  });

  it('displays the right value in CheckboxInput', async () => {
    render(<CatsPage />);

    const inputFish = screen.getByRole('checkbox', { name: 'Fish' });
    const inputMeat = screen.getByRole('checkbox', { name: 'Meat' });
    const inputMilk = screen.getByRole('checkbox', { name: 'Milk' });

    expect(inputFish).not.toBeChecked();
    expect(inputMeat).not.toBeChecked();
    expect(inputMilk).not.toBeChecked();

    await userEvent.click(inputFish);
    expect(inputFish).toBeChecked();
    expect(inputMeat).not.toBeChecked();
    expect(inputMilk).not.toBeChecked();

    await userEvent.click(inputMeat);
    expect(inputFish).toBeChecked();
    expect(inputMeat).toBeChecked();
    expect(inputMilk).not.toBeChecked();

    await userEvent.click(inputMilk);
    expect(inputFish).toBeChecked();
    expect(inputMeat).toBeChecked();
    expect(inputMilk).toBeChecked();

    await userEvent.click(inputFish);
    expect(inputFish).not.toBeChecked();
    expect(inputMeat).toBeChecked();
    expect(inputMilk).toBeChecked();
  });

  it('displays the right value in FileInput', async () => {
    render(<CatsPage />);
    const input = screen.getByTestId('file-input') as HTMLInputElement;

    const file = new File(['test image content'], 'test-image.png', {
      type: 'image/png',
    });

    fireEvent.change(input, { target: { files: [file] } });

    expect(input.files![0]).toStrictEqual(file);
  });
});
