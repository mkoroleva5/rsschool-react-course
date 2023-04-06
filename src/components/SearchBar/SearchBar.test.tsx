import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '../Card/Card.test';
import { createStore } from '../../store';
import { createApi } from 'unsplash-js';
import { Provider } from 'react-redux';

const unsplashMock = createApi({
  accessKey: '',
});

const store = createStore(unsplashMock);
const onSubmitMock = vi.fn();

const Component = () => {
  return (
    <Provider store={store}>
      <SearchBar onSubmit={onSubmitMock} />
    </Provider>
  );
};

describe('Search bar tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('updates search value and clears it when form is submitted', async () => {
    const value = 'test value';
    const emptyString = '';
    render(<Component />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toEqual(value);

    fireEvent.submit(input);
    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(null);
  });

  it('calls a function on submit', async () => {
    render(<Component />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.submit(input);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
