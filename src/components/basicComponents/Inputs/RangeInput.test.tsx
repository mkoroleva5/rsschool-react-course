import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { RangeInput } from './RangeInput';

describe('Range input tests', () => {
  it('calls a function when onSubmitSuccess prop changes', () => {
    const registerMock = vi.fn();
    const onSubmitSuccessMock = vi.fn(() => true);
    render(
      <RangeInput
        label="cuteness"
        register={registerMock}
        onSubmitSuccess={new onSubmitSuccessMock()}
      />
    );

    const input = screen.getByRole('slider');
    expect(input).toHaveValue('50');
    fireEvent.change(input, { target: { value: 70 } });
    expect(input).toHaveValue('70');
    expect(onSubmitSuccessMock).toHaveBeenCalled();
  });
});
