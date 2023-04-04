import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Card } from './Card';
import data from '../../data/data.json';
import noImage from '../../assets/images/default.jpg';

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
    render(<Card {...item} showFavourites={true} />);
    await user.click(screen.getByTestId('star-button-1'));
    expect(screen.getByTestId('star-svg-1')).toHaveClass('favourite');
  });

  it('sets data to localStorage', () => {
    render(<Card {...item} id={1} showFavourites={true} />);
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('card-1')).toEqual('false');
  });

  it('returns right value', async () => {
    const value = false;
    window.localStorage.setItem('card-1', JSON.stringify(value));
    render(<Card {...item} id={1} showFavourites={true} />);

    expect(window.localStorage.getItem('card-1')).toEqual('false');
  });

  it('stores data in localStorage after click', async () => {
    const user = userEvent.setup();
    render(<Card {...item} id={1} showFavourites={true} />);
    await user.click(screen.getByTestId('star-button-1'));
    window.dispatchEvent(new Event('beforeunload'));
    expect(window.localStorage.getItem('card-1')).toEqual('true');
  });

  it('has favourite class when local storage is changed', () => {
    const value = true;
    window.localStorage.setItem('card-1', JSON.stringify(value));
    render(<Card {...item} id={1} showFavourites={true} />);
    expect(screen.getByTestId('star-svg-1')).toHaveClass('favourite');
  });

  it('deletes data from localStorage when delete button is clicked', async () => {
    const cats = [item];
    window.localStorage.setItem('cats-list', JSON.stringify(cats));

    render(
      <Card
        {...item}
        showFavourites={false}
        isRemovable={true}
        onDelete={() => {
          const deletedCatIndex = cats.findIndex((el) => el.id === item.id);
          const newCats = cats.filter((_, i) => i !== deletedCatIndex);
          localStorage.setItem('cats-list', JSON.stringify(newCats));
        }}
      />
    );

    await userEvent.click(screen.getByTestId(`delete-button-${item.id}`));
    const newCatsList = window.localStorage.getItem('cats-list');
    const catsListArray = newCatsList ? JSON.parse(newCatsList) : null;
    expect(catsListArray).toEqual([]);
  });

  it('displays an image after loading', () => {
    render(<Card {...item} id={1} />);

    const image = screen.getByRole('img');
    image.dispatchEvent(new Event('load'));
    expect(image).toBeInTheDocument();
  });

  it('calls a function when card is clicked', async () => {
    const onOpeningMock = vi.fn();
    render(<Card {...item} id={1} onOpening={onOpeningMock} />);

    const card = screen.getByRole('button', { name: /Tigger/i });
    expect(card).toBeInTheDocument();

    await userEvent.click(card);
    expect(onOpeningMock).toHaveBeenCalledTimes(1);
  });
});
