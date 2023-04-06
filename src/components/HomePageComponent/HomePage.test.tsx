import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from './HomePage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import data from '../../data/data.json';
import { LocalStorageMock } from '../../components/CardComponent/Card.test';
import { createApi } from 'unsplash-js';
import { ApiContext } from '../../api/ApiContext';
import unsplashTestData from '../../data/unsplashApiTestData.json';

const item = data[0];
const unsplashMock = createApi({
  accessKey: '',
});

describe('Home page tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
    vi.spyOn(unsplashMock.search, 'getPhotos').mockImplementation(async () => {
      return { response: { results: unsplashTestData } } as never;
    });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it('makes a call to unsplash API with query from search bar', async () => {
    const spy = vi.spyOn(unsplashMock.search, 'getPhotos');

    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    await act(async () => {
      fireEvent.submit(input);
    });

    expect(spy).toBeCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ query: 'test', orientation: 'landscape' });
  });

  it('shows error when there are no results from unsplash API', async () => {
    vi.spyOn(unsplashMock.search, 'getPhotos').mockImplementation(() => {
      return Promise.reject('test error');
    });

    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    await act(async () => {
      fireEvent.submit(input);
    });

    const noResultsMessage = await waitFor(() => screen.getByText(/no results 🙁/i));
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('shows message when there are no results from unsplash API', async () => {
    vi.spyOn(unsplashMock.search, 'getPhotos').mockImplementation(async () => {
      return { response: { results: [] } } as never;
    });

    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    await act(async () => {
      fireEvent.submit(input);
    });

    const noResultsMessage = await waitFor(() => screen.getByText(/no results 🙁/i));
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('displays progress bar and cards when request in sent', async () => {
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const progressBar = screen.getByText(/Progressing.../i);
    expect(progressBar).toBeInTheDocument();

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /Cat/i }));
    expect(cards[0]).toBeInTheDocument();
  });

  it('displays modal window when card is clicked', async () => {
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /Cat/i }));
    await userEvent.click(cards[0]);

    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal window when button is clicked', async () => {
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /Cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button-0');
    await userEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it('closes modal window when background is clicked', async () => {
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /Cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-0');
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  it('displays spinner when image is not loaded', async () => {
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    fireEvent.submit(input);

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /Cat/i }));
    await userEvent.click(cards[0]);

    const spinner = screen.getByTestId('modal-spinner-0');
    expect(spinner).toBeInTheDocument();
  });

  it('updates search value when input changes', async () => {
    const value = 'test value';
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('displays no cards when localStorage data is invalid', () => {
    window.localStorage.setItem('cards-list', 'abc');

    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const cards = screen.getByTestId('cards-wrapper');
    cards.childElementCount;
    expect(cards.childElementCount).toBe(0);
  });

  it('deletes data from localStorage when delete button is clicked', async () => {
    const cards = [item];
    window.localStorage.setItem('cards-list', JSON.stringify(cards));

    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

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
    render(
      <ApiContext.Provider value={unsplashMock}>
        <HomePage />
      </ApiContext.Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(window.localStorage.getItem('search-value')).toBe(value);

    await act(async () => {
      fireEvent.submit(input);
    });
    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(null);
  });
});
