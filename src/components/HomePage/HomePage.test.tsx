import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from './HomePage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '../Card/Card.test';
import { createApi } from 'unsplash-js';
import unsplashTestData from '../../data/unsplashApiTestData.json';
import { Provider } from 'react-redux';
import { createStore } from '../../store';

const unsplashMock = createApi({
  accessKey: '',
});

const store = createStore(unsplashMock);
const Component = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

describe('Home page tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
    vi.spyOn(unsplashMock.search, 'getPhotos').mockImplementation(async () => {
      return {
        type: 'success',
        response: { results: unsplashTestData },
        originalResponse: { ok: true },
        status: 200,
      } as never;
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it('makes a call to unsplash API with query from search bar', async () => {
    const spy = vi.spyOn(unsplashMock.search, 'getPhotos');
    render(<Component />);

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

    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    await act(async () => {
      fireEvent.submit(input);
    });

    const noResultsMessage = await waitFor(() => screen.getByText(/An error occured: test error/i));
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('shows message when there are no results from unsplash API', async () => {
    vi.spyOn(unsplashMock.search, 'getPhotos').mockImplementation(async () => {
      return {
        type: 'success',
        response: { results: [] },
        originalResponse: { ok: true },
        status: 200,
      } as never;
    });

    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'test');
    await act(async () => {
      fireEvent.submit(input);
    });

    const noResultsMessage = await waitFor(() => screen.getByText(/no results 🙁/i));
    expect(noResultsMessage).toBeInTheDocument();
  });

  it('displays progress bar and cards when request in sent', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const progressBar = screen.getByText(/Progressing.../i);
    expect(progressBar).toBeInTheDocument();

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    expect(cards[0]).toBeInTheDocument();
  });

  it('displays modal window when card is clicked', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal window when button is clicked', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button-1');
    await userEvent.click(closeButton);
    expect(modal).not.toBeInTheDocument();
  });

  it('closes modal window when background is clicked', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);
    const modal = screen.getByTestId('modal-1');
    await userEvent.click(modal);
    expect(modal).not.toBeInTheDocument();
  });

  it('displays spinner when image is not loaded', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    await userEvent.click(cards[0]);

    const spinner = screen.getByTestId('modal-spinner-1');
    expect(spinner).toBeInTheDocument();
  });

  it('updates search value when input changes', async () => {
    render(<Component />);
    const value = 'test value';
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('deletes data from localStorage when delete button is clicked', async () => {
    render(<Component />);
    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, 'cat');
    act(() => {
      fireEvent.submit(input);
    });

    const cards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    expect(cards).toHaveLength(10);

    await userEvent.click(screen.getByTestId('delete-button-1'));
    const newCards = await waitFor(() => screen.getAllByRole('button', { name: /cat/i }));
    expect(newCards).toHaveLength(9);

    const newCardsList = window.localStorage.getItem('cards-list');
    const cardsListArray = newCardsList ? JSON.parse(newCardsList) : null;
    expect(cardsListArray).toHaveLength(9);
  });

  it('updates search value and saves it to localStorage when form is submitted', async () => {
    const value = 'test value';
    render(<Component />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    waitFor(() => expect(window.localStorage.getItem('search-value')).toBe(value));

    await act(async () => {
      fireEvent.submit(input);
    });
    expect(window.localStorage.getItem('search-value')).toBe(null);
  });
});
