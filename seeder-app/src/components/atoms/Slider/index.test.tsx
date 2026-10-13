import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './index';

describe('Slider Atom', () => {
  test('renders slider range input with min, max, and value', () => {
    render(
      <Slider
        min={0}
        max={100}
        value={50}
        onChange={() => {}}
        aria-label="volume-slider"
      />
    );
    const slider = screen.getByRole('slider', { name: /volume-slider/i });
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('type', 'range');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('value', '50');
    expect(slider).toHaveClass('custom-slider');
  });

  test('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(
      <Slider
        min={0}
        max={100}
        value={25}
        onChange={handleChange}
        aria-label="amount-slider"
      />
    );
    const slider = screen.getByRole('slider', { name: /amount-slider/i });

    fireEvent.change(slider, { target: { value: '75' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('appends custom className when provided', () => {
    render(
      <Slider
        min={0}
        max={10}
        value={5}
        onChange={() => {}}
        className="custom-range"
        aria-label="range-input"
      />
    );
    const slider = screen.getByRole('slider', { name: /range-input/i });
    expect(slider).toHaveClass('custom-slider', 'custom-range');
  });

  test('respects disabled state when disabled prop is provided', () => {
    render(
      <Slider
        min={0}
        max={100}
        value={50}
        onChange={() => {}}
        disabled
        aria-label="disabled-slider"
      />
    );
    const slider = screen.getByRole('slider', { name: /disabled-slider/i });
    expect(slider).toBeDisabled();
  });
});
