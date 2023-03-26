import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage tests', () => {
  it('renders the 404 title', () => {
    render(<NotFoundPage />);
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the page not found text', () => {
    render(<NotFoundPage />);
    const textElement = screen.getByText(/Page not found/i);
    expect(textElement).toBeInTheDocument();
  });

  it('renders the return button', () => {
    render(<NotFoundPage />);
    const buttonElement = screen.getByRole('link', { name: /Return to home page/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('href', '/');
  });
});
