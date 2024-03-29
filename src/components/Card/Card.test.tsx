import { act, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Card } from './Card';
import data from '../../data/data.json';
import noImage from '../../assets/images/default.jpg';
import { createStore } from '../../store/index';
import { createApi } from 'unsplash-js';
import { Provider } from 'react-redux';

const item = data[0];

export class LocalStorageMock {
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

const unsplashMock = createApi({
  accessKey: '',
});

const store = createStore(unsplashMock);

describe('Card tests', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new LocalStorageMock());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loads and displays image', () => {
    render(
      <Provider store={store}>
        <Card {...item} />
      </Provider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('loads default image when no source', () => {
    render(
      <Provider store={store}>
        <Card {...item} image={''} />
      </Provider>
    );
    expect(screen.getByRole('img')).toHaveAttribute('src', noImage);
  });

  it('displays right rating width style percentage', () => {
    const percentage = 87;
    render(
      <Provider store={store}>
        <Card {...item} cuteness={percentage} />
      </Provider>
    );
    expect(screen.getByTestId('rating')).toHaveStyle(`width: ${percentage}%`);
  });

  it('displays an image after loading', () => {
    render(
      <Provider store={store}>
        <Card {...item} id={1} />
      </Provider>
    );

    const image = screen.getByRole('img');
    act(() => {
      image.dispatchEvent(new Event('load'));
    });
    expect(image).toBeInTheDocument();
  });

  it('calls a function when card is clicked', async () => {
    const onOpeningMock = vi.fn();
    render(
      <Provider store={store}>
        <Card {...item} id={1} onOpening={onOpeningMock} />
      </Provider>
    );

    const card = screen.getByRole('button', { name: /Tigger/i });
    expect(card).toBeInTheDocument();

    await userEvent.click(card);
    expect(onOpeningMock).toHaveBeenCalledTimes(1);
  });

  it('loads default image when no source', () => {
    render(
      <Provider store={store}>
        <Card {...item} image={''} />
      </Provider>
    );
    expect(screen.getByRole('img', { name: /tigger/i })).toHaveAttribute('src', noImage);
  });
});
