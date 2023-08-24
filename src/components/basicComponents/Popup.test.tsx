import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Popup } from './Popup';
import { vi } from 'vitest';

describe('Popup tests', async () => {
  it('renders popup', async () => {
    const onCloseMock = vi.fn();
    render(<Popup onClick={onCloseMock} />);
    const popup = screen.getByText(/the cat has been created!/i);
    expect(popup).toBeInTheDocument();
  });

  it('calls a funtion when it is clicked outside the popup', async () => {
    const onCloseMock = vi.fn();
    render(<Popup onClick={onCloseMock} />);

    const popupWrapper = screen.getByRole('button', {
      name: /the cat has been created!/i,
    });

    await userEvent.click(popupWrapper);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
