import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Modal } from './Modal';

const cat = {
  id: 1,
  name: 'Cat',
  breed: 'Persian',
  description: 'Date of birth: 2023-03-04',
  gender: 'F',
  cuteness: 75,
  info: 'Favourite meals: fish, milk',
  image: '',
};

describe('Modal window tests', async () => {
  it('displays modal window when card is clicked', async () => {
    render(<Modal page="" id={1} onClose={() => {}} />);

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal window when button is clicked', async () => {
    const onCloseMock = vi.fn();
    render(<Modal page="" id={1} onClose={onCloseMock} />);

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button-1');
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes modal window when background is clicked', async () => {
    const onCloseMock = vi.fn();
    render(<Modal page="" id={1} onClose={onCloseMock} />);

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('displays error when localStorage data is invalid', () => {
    window.localStorage.setItem('cards-list', 'abc');
    render(<Modal page="cards" id={1} onClose={() => {}} />);

    const modalTitle = screen.getByRole('heading');
    expect(modalTitle.textContent).toBe('');
  });

  it('displays spinner before loading and an image after loading', () => {
    render(<Modal page="" id={1} onClose={() => {}} />);
    const spinner = screen.getByTestId('modal-spinner-1');
    expect(spinner).toBeInTheDocument();

    const image = screen.getByRole('img');
    act(() => {
      image.dispatchEvent(new Event('load'));
    });
    expect(image).toBeInTheDocument();
  });

  it('displays rating if it exists in the card props', () => {
    window.localStorage.setItem('cards-list', JSON.stringify([cat]));
    render(<Modal page="cards" id={1} onClose={() => {}} />);

    const rating = screen.getByTestId('modal-rating-1');
    expect(rating).toBeInTheDocument();
  });
});
