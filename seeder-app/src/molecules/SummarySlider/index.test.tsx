import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SummarySlider } from './index';

describe('SummarySlider Molecule', () => {
  test('renders header label and formatted values', () => {
    render(
      <SummarySlider
        max={500000}
        value={150000}
        onChange={() => {}}
        onReset={() => {}}
      />
    );

    expect(screen.getByText('Slide to autoselect')).toBeInTheDocument();
    expect(screen.getByText('$150,000.00')).toBeInTheDocument();
    expect(screen.getByText('selected of')).toBeInTheDocument();
    expect(screen.getByText('$500,000.00')).toBeInTheDocument();
  });

  test('disables reset button when value is 0', () => {
    render(
      <SummarySlider
        max={500000}
        value={0}
        onChange={() => {}}
        onReset={() => {}}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    expect(resetBtn).toBeDisabled();
  });

  test('enables reset button when value is greater than 0 and triggers onReset', () => {
    const handleReset = jest.fn();
    render(
      <SummarySlider
        max={500000}
        value={100000}
        onChange={() => {}}
        onReset={handleReset}
      />
    );

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    expect(resetBtn).not.toBeDisabled();

    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  test('triggers onChange with numeric value when slider changes', () => {
    const handleChange = jest.fn();
    render(
      <SummarySlider
        max={500000}
        value={100000}
        onChange={handleChange}
        onReset={() => {}}
      />
    );

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '250000' } });

    expect(handleChange).toHaveBeenCalledWith(250000);
  });
});
