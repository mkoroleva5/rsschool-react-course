import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('Footer tests', () => {
  it('renders github link', () => {
    render(<Footer />);
    const githubLink = screen.getByRole('link', { name: /github mkoroleva5/i });
    expect(githubLink).toBeInTheDocument();
  });

  it('renders rsschool link', () => {
    render(<Footer />);
    const rsLink = screen.getByRole('link', { name: /rolling scopes school/i });
    expect(rsLink).toBeInTheDocument();
  });
});
