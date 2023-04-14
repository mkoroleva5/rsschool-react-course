import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tooltip } from './Tooltip';

describe('Tooltip tests', async () => {
  it('renders tooltip', async () => {
    render(<Tooltip message="error" />);
    const tooltip = screen.getByText(/error/i);
    expect(tooltip).toBeInTheDocument();
  });
});
