import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { HomePage } from './HomePage';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import noImage from '../../assets/images/default.jpg';
import { Card } from '../CardComponent/Card';
import data from '../../data.json';

const item = data[0];

class LocalStorageMock {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  get length() {
    return Object.keys(this.store).length;
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: unknown) {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

describe('Cards wrapper tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('updates search value when input changes', async () => {
    const value = 'test value';
    render(<HomePage />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, value);
    expect(input.value).toBe(value);
  });

  it('updates search value and saves it to localStorage when form is submitted', async () => {
    const value = 'test value';
    const emptyString = '';
    render(<HomePage />);

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /search/i }) as HTMLButtonElement;

    await userEvent.type(input, value);
    await userEvent.click(submitButton);

    expect(input.value).toBe(emptyString);
    expect(window.localStorage.getItem('search-value')).toBe(value);
  });

  it('has favourite class when local storage is changed', () => {
    const value = true;
    window.localStorage.setItem('card-1', JSON.stringify(value));
    render(<HomePage />);
    expect(screen.getByTestId('star-svg-1')).toHaveClass('favourite');
  });

  it('loads default image when no source', () => {
    render(<Card {...item} image={''} />);
    expect(screen.getByRole('img', { name: /tigger/i })).toHaveAttribute('src', noImage);
  });
});
