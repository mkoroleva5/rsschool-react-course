import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Card } from './Card';
import data from '../../data.json';
import noImage from '../../assets/images/default.jpg';

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

describe('Card tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  it('loads and displays image', () => {
    render(<Card {...item} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('loads default image when no source', () => {
    render(<Card {...item} image={''} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', noImage);
  });

  it('displays correct name', () => {
    const name = 'Tigger';
    render(<Card {...item} name={name} />);
    expect(screen.getByRole('heading')).toHaveTextContent(name);
  });

  it('displays right rating width style percentage', () => {
    const percentage = 87;
    render(<Card {...item} cuteness={percentage} />);
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${percentage}%`);
  });

  it('changes class on click', async () => {
    const user = userEvent.setup();
    render(<Card {...item} />);
    await user.click(screen.getByRole('button'));
    expect(screen.getByTestId('star-svg')).toHaveClass('favourite');
  });

  it('sets data to local storage', () => {
    render(<Card {...item} id={1} />);
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('card-1')).toEqual('false');
  });

  it('stores data in local storage after click', async () => {
    const user = userEvent.setup();
    render(<Card {...item} id={1} />);
    await user.click(screen.getByRole('button'));
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('card-1')).toEqual('true');
  });

  it('has facourite class when local storage is changed', () => {
    const value = true;
    window.localStorage.setItem('card-1', JSON.stringify(value));
    render(<Card {...item} id={1} />);
    expect(screen.getByTestId('star-svg')).toHaveClass('favourite');
  });
});
