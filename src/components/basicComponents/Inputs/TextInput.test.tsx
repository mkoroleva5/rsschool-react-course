import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { TextInput } from './TextInput';

describe('Text input tests', () => {
  it('changes classes empty and invalid when onSubmitSuccess prop changes', () => {
    const registerMock = vi.fn();
    const onSubmitSuccessMock = vi.fn();
    render(
      <TextInput
        label="name"
        register={registerMock}
        errors={{}}
        onSubmitSuccess={new onSubmitSuccessMock()}
      />
    );

    const input = screen.getByLabelText('name');
    fireEvent.change(input, { target: { value: 'Cat' } });

    expect(input).not.toHaveClass('empty');
    expect(input).not.toHaveClass('invalid');
    expect(onSubmitSuccessMock).toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '' } });

    expect(input).toHaveClass('empty');
    expect(input).toHaveClass('invalid');
    expect(onSubmitSuccessMock).toHaveBeenCalled();

    fireEvent.change(input, { target: { value: 'ca' } });
    expect(input).not.toHaveClass('empty');
    expect(input).toHaveClass('invalid');

    fireEvent.change(input, { target: { value: 'cat' } });
    expect(input).not.toHaveClass('empty');
    expect(input).toHaveClass('invalid');
  });
});
