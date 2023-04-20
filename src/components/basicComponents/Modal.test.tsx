import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { Modal } from './Modal';
import { createApi } from 'unsplash-js';
import { createStore } from '../../store';
import { Provider } from 'react-redux';

const unsplashMock = createApi({
  accessKey: '',
});
const store = createStore(unsplashMock);

describe('Modal window tests', async () => {
  it('displays modal window when card is clicked', async () => {
    render(
      <Provider store={store}>
        <Modal page="cards" id={1} onClose={() => {}} />
      </Provider>
    );

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();
  });

  it('closes modal window when button is clicked', async () => {
    const onCloseMock = vi.fn();
    render(
      <Provider store={store}>
        <Modal page="cards" id={1} onClose={onCloseMock} />
      </Provider>
    );

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();

    const closeButton = screen.getByTestId('modal-close-button-1');
    await userEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('closes modal window when background is clicked', async () => {
    const onCloseMock = vi.fn();
    render(
      <Provider store={store}>
        <Modal page="cards" id={1} onClose={onCloseMock} />
      </Provider>
    );

    const modal = screen.getByTestId('modal-1');
    expect(modal).toBeInTheDocument();

    await userEvent.click(modal);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('displays error when localStorage data is invalid', () => {
    window.localStorage.setItem('cards-list', 'abc');
    render(
      <Provider store={store}>
        <Modal page="cards" id={1} onClose={() => {}} />
      </Provider>
    );

    const modalTitle = screen.getByRole('heading');
    expect(modalTitle.textContent).toBe('');
  });

  it('displays spinner before loading and an image after loading', () => {
    render(
      <Provider store={store}>
        <Modal page="cards" id={1} onClose={() => {}} />
      </Provider>
    );
    const spinner = screen.getByTestId('modal-spinner-1');
    expect(spinner).toBeInTheDocument();

    const image = screen.getByRole('img');
    act(() => {
      image.dispatchEvent(new Event('load'));
    });
    expect(image).toBeInTheDocument();
  });
});
