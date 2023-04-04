import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '../Card/Card.test';

describe('Search bar tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('updates search value when input changes', async () => {
    const value = 'test value';
    render(<SearchBar onSubmit={() => {}} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('updates search value and saves it to localStorage when form is submitted', async () => {
    const value = 'test value';
    const emptyString = '';
    render(<SearchBar onSubmit={() => {}} />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(window.localStorage.getItem('search-value')).toBe(value);

    fireEvent.submit(input);
    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(null);
  });

  it('calls a function on submit', async () => {
    const onSubmitMock = vi.fn();
    render(<SearchBar onSubmit={onSubmitMock} />);

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.submit(input);
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
