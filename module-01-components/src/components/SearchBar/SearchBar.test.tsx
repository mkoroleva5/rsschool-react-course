import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { SearchBar } from './SearchBar';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LocalStorageMock } from '../../components/CardComponent/Card.test';

describe('Cards wrapper tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('updates search value when input changes', async () => {
    const value = 'test value';
    render(<SearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('updates search value and saves it to localStorage when form is submitted', async () => {
    const value = 'test value';
    const emptyString = '';
    render(<SearchBar />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /search/i }) as HTMLButtonElement;

    await userEvent.type(input, value);
    await userEvent.click(submitButton);

    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(value);
  });
});
