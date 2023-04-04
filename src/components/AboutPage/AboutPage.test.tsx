import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AboutPage } from './AboutPage';

describe('AboutPage tests', () => {
  it('renders the about page title', () => {
    render(<AboutPage />);
    const titleElement = screen.getByRole('heading');
    expect(titleElement).toBeInTheDocument();
  });

  it('loads and displays image', () => {
    render(<AboutPage />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
