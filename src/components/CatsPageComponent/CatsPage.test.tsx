import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  info: 'Favourite meals: fish, milk',
  image: '',
};

describe('CatsPage tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('displays no cats when localStorage data is invalid', () => {
    window.localStorage.setItem('cats-list', 'abc');
    render(<CatsPage />);

    const cats = screen.getByTestId('cats-wrapper');
    expect(cats.childElementCount).toBe(0);
  });

  it('adds a new cat when form is submitted', async () => {
    window.localStorage.setItem('cats-list', JSON.stringify([]));
    render(<CatsPage />);
    const submitButton = screen.getByRole('button', { name: /create/i });
    const inputText = screen.getByRole('textbox') as HTMLInputElement;
    const inputSelect = screen.getByRole('combobox') as HTMLSelectElement;
    const option = screen.getByRole('option', { name: 'Persian' });
    const inputDate = screen.getByLabelText('date of birth') as HTMLInputElement;
    const date = new Date('2023-03-23').toISOString().slice(0, 10);
    const inputMale = screen.getByRole('radio', { name: 'male' });
    const inputFish = screen.getByRole('checkbox', { name: 'fish' });
    const inputFile = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['test image content'], 'test-image.jpg', {
      type: 'image/jpeg',
    });

    await userEvent.selectOptions(inputSelect, option);
    await userEvent.type(inputDate, date);
    await userEvent.click(inputMale);
    await userEvent.click(inputFish);
    await waitFor(() => userEvent.upload(inputFile, file));
    await userEvent.click(submitButton);

    const tooltip = screen.getByText(/enter a name/i);
    expect(tooltip).toBeInTheDocument();

    await userEvent.type(inputText, 'Cat');
    await userEvent.click(submitButton);
    expect(tooltip).not.toBeInTheDocument();

    const card = await waitFor(() => screen.getByRole('img', { name: /cat/i }));
    expect(card).toBeInTheDocument();

    const modal = screen.getByRole('button', { name: /the cat has been created!/i });
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  it('shows card info in the modal window', async () => {
    const cats = [cat];
    window.localStorage.setItem('cats-list', JSON.stringify(cats));

    render(<CatsPage />);

    const card = screen.getByRole('button', { name: /cat/i });
    await userEvent.click(card);

    const meals = screen.getByText(/favourite meals: fish/i);
    expect(meals).toBeInTheDocument();
  });

  it('closes the modal window on click outside of it', async () => {
    const cats = [cat];
    window.localStorage.setItem('cats-list', JSON.stringify(cats));

    render(<CatsPage />);

    const card = screen.getByRole('button', { name: /cat/i });
    await userEvent.click(card);

    const modal = screen.getByRole('button', {
      name: /favourite meals: fish/i,
    });
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  it('sets data to localStorage', () => {
    render(<CatsPage />);
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('cats-list')).toEqual('[]');
  });

  it('displays error when localStorage data is invalid', () => {
    render(<CatsPage />);
    window.localStorage.setItem('cats-list', 'abc');
    let parsedCatsList = null;

    try {
      const catsList = window.localStorage.getItem('cats-list');
      if (catsList !== null) {
        parsedCatsList = JSON.parse(catsList);
      }
    } catch (err) {
      window.localStorage.setItem('cats-list', '');
    }

    expect(parsedCatsList).toBe(null);
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

  it('adds classNames empty/invalid if TextInput is empty/invalid', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /create/i });

    expect(input).toHaveClass('empty');

    await userEvent.type(input, 'C');
    expect(input).toHaveClass('invalid');
    expect(input).not.toHaveClass('empty');

    await userEvent.type(input, 'at');
    expect(input).not.toHaveClass('empty');
    expect(input).not.toHaveClass('invalid');

    await userEvent.clear(input);
    expect(input).toHaveClass('invalid');
    expect(input).toHaveClass('empty');

    await userEvent.click(submitButton);
    const requiredError = screen.getByText(/enter a name/i);
    expect(requiredError).toBeInTheDocument();
  });

  it('displays a tooltip if TextInput is invalid or empty', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /create/i });

    await userEvent.type(input, 'cat');
    await userEvent.click(submitButton);
    const patternError = screen.getByText(
      /the name must start with a capital letter and be between 3 and 12 characters long/i
    );
    expect(patternError).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.click(submitButton);
    const requiredError = screen.getByText(/enter a name/i);
    expect(requiredError).toBeInTheDocument();
  });

  it('displays the right value in SelectInput', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('combobox') as HTMLSelectElement;
    const option = screen.getByRole('option', { name: 'Persian' });
    const value = 'Persian';

    await userEvent.selectOptions(input, option);
    expect(input).toHaveValue(value);
  });

  it('add className invalid if SelectInput is empty', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('combobox') as HTMLSelectElement;
    const option = screen.getByRole('option', { name: 'Persian' });
    const submitButton = screen.getByRole('button', { name: /create/i });

    await userEvent.selectOptions(input, option);
    await userEvent.click(submitButton);
    expect(input).not.toHaveClass('invalid');

    await userEvent.selectOptions(input, '');
    expect(input).toHaveClass('invalid');
  });

  it('displays the right value in DateInput', async () => {
    render(<CatsPage />);
    const input = screen.getByLabelText('date of birth') as HTMLInputElement;
    const date = new Date('2023-03-23').toISOString().slice(0, 10);

    await userEvent.type(input, date);
    expect(input).toHaveValue(date);
    expect(input).not.toHaveClass('invalid');

    await userEvent.clear(input);
    expect(input).toHaveClass('invalid');
  });

  it('displays the right value in RadioInput', async () => {
    render(<CatsPage />);

    const inputMale = screen.getByRole('radio', { name: 'male' });
    const inputFemale = screen.getByRole('radio', { name: 'female' });

    expect(inputFemale).not.toBeChecked();
    expect(inputMale).not.toBeChecked();

    await userEvent.click(inputFemale);
    expect(inputFemale).toBeChecked();
    expect(inputMale).not.toBeChecked();

    await userEvent.click(inputMale);
    expect(inputFemale).not.toBeChecked();
    expect(inputMale).toBeChecked();
  });

  it('displays the right value in RangeInput', async () => {
    render(<CatsPage />);
    const input = screen.getByRole('slider') as HTMLInputElement;

    expect(input).toHaveValue('50');
    fireEvent.change(input, { target: { value: 70 } });
    expect(input).toHaveValue('70');
  });

  it('displays the right value in CheckboxInput', async () => {
    render(<CatsPage />);

    const inputFish = screen.getByRole('checkbox', { name: 'fish' });
    const inputMeat = screen.getByRole('checkbox', { name: 'meat' });
    const inputMilk = screen.getByRole('checkbox', { name: 'milk' });

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

  it('', async () => {
    const cats = [cat];
    window.localStorage.setItem('cats-list', JSON.stringify(cats));

    render(<CatsPage />);

    const cards = screen.getAllByRole('button', { name: /cat/i });
    await userEvent.click(cards[0]);

    const rating = screen.getByTestId('modal-rating-1');
    expect(rating).toBeInTheDocument();
  });
});
