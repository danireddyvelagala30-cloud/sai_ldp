import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CheckBox } from './index';

describe('CheckBox Atom', () => {
  test('renders checkbox input', () => {
    render(<CheckBox aria-label="agree-terms" />);
    const checkbox = screen.getByRole('checkbox', { name: /agree-terms/i });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveClass('custom-checkbox');
  });

  test('reflects checked state correctly when checked is true', () => {
    render(<CheckBox checked={true} onChange={() => {}} aria-label="select-item" />);
    const checkbox = screen.getByRole('checkbox', { name: /select-item/i });
    expect(checkbox).toBeChecked();
  });

  test('reflects unchecked state correctly when checked is false', () => {
    render(<CheckBox checked={false} onChange={() => {}} aria-label="select-item" />);
    const checkbox = screen.getByRole('checkbox', { name: /select-item/i });
    expect(checkbox).not.toBeChecked();
  });

  test('triggers onChange callback when clicked', () => {
    const handleChange = jest.fn();
    render(<CheckBox onChange={handleChange} aria-label="toggle" />);
    const checkbox = screen.getByRole('checkbox', { name: /toggle/i });

    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('appends custom className when provided', () => {
    render(<CheckBox className="table-checkbox" aria-label="custom-cb" />);
    const checkbox = screen.getByRole('checkbox', { name: /custom-cb/i });
    expect(checkbox).toHaveClass('custom-checkbox', 'table-checkbox');
  });

  test('is disabled when disabled prop is passed', () => {
    render(<CheckBox disabled aria-label="disabled-cb" />);
    const checkbox = screen.getByRole('checkbox', { name: /disabled-cb/i });
    expect(checkbox).toBeDisabled();
  });
});
