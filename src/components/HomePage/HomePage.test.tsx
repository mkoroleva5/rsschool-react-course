import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from './HomePage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import noImage from '../../assets/images/default.jpg';
import { Card } from '../Card/Card';
import data from '../../data/data.json';
import { LocalStorageMock } from '../Card/Card.test';
import { createApi } from 'unsplash-js';

const item = data[0];

const unsplashMock = vi.fn().mockImplementation(
  createApi({
    accessKey: 'E5bvAoy3CzFiyPKWtrefHM0hluG_543-BOZxiJ0XNfY',
  }).search.getPhotos
);

describe('Cards wrapper tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it('makes a call to unsplash API', async () => {
    unsplashMock({ query: 'test' });
    expect(unsplashMock).toBeCalledTimes(1);
  });

  it('makes a call to unsplash API with query from search bar', async () => {
    render(<HomePage />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    fireEvent.submit(input);
    expect(unsplashMock).toBeCalledTimes(1);
    expect(unsplashMock).toHaveBeenCalledWith({ query: 'test' });
  });

  it('displays progress bar and cards when request in sent', async () => {
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const progressBar = screen.getByText(/Progressing.../i);
    expect(progressBar).toBeInTheDocument();

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    expect(cards[0]).toBeInTheDocument();
  });

  it('displays modal window when card is clicked', async () => {
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);

    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal window when button is clicked', async () => {
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button-0');
    await userEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it('closes modal window when background is clicked', async () => {
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  it('displays spinner when image is not loaded', async () => {
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);

    const spinner = screen.getByTestId('modal-spinner-0');
    expect(spinner).toBeInTheDocument();
  });

  it('updates search value when input changes', async () => {
    const value = 'test value';
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('deletes data from localStorage when delete button is clicked', async () => {
    const cards = [item];
    window.localStorage.setItem('cards-list', JSON.stringify(cards));

    render(<HomePage />);

    await userEvent.click(screen.getByTestId(`delete-button-${cards[0].id}`));

    const deletedCardIndex = cards.findIndex((el) => el.id === cards[0].id);
    const newCards = cards.filter((_, i) => i !== deletedCardIndex);
    localStorage.setItem('cards-list', JSON.stringify(newCards));

    const newCardsList = window.localStorage.getItem('cards-list');
    const cardsListArray = newCardsList ? JSON.parse(newCardsList) : null;

    expect(cardsListArray).toEqual([]);
  });

  it('updates search value and saves it to localStorage when form is submitted', async () => {
    const value = 'test value';
    const emptyString = '';
    render(<HomePage />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(window.localStorage.getItem('search-value')).toBe(value);

    fireEvent.submit(input);
    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(null);
  });

  it('loads default image when no source', () => {
    render(<Card {...item} image={''} />);
    expect(screen.getByRole('img', { name: /tigger/i })).toHaveAttribute('src', noImage);
  });
});
