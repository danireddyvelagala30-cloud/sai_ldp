import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SummaryCard } from './index';

describe('SummaryCard Organism', () => {
  const defaultProps = {
    selectedCount: 2,
    selectedTotal: 276000,
    maxTotal: 880000,
    sliderValue: 276000,
    onSliderChange: jest.fn(),
    onReset: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders summary details and financial calculations accurately when contracts are selected', () => {
    render(<SummaryCard {...defaultProps} />);

    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByText('$276,000.00').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('(12.00%)')).toBeInTheDocument();
    expect(screen.getByText('$33,120.00')).toBeInTheDocument();
    expect(screen.getByText('$309,120.00')).toBeInTheDocument();
  });

  test('handles 0 selected contracts with 0.0 fee rate and disabled submit button', () => {
    render(
      <SummaryCard
        {...defaultProps}
        selectedCount={0}
        selectedTotal={0}
        sliderValue={0}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('(0.00%)')).toBeInTheDocument();
    const submitBtn = screen.getByRole('button', { name: /review your credit/i });
    expect(submitBtn).toBeDisabled();
    expect(submitBtn).toHaveClass('disabled');
  });

  test('enables submit button and calls onSubmit when clicked', () => {
    render(<SummaryCard {...defaultProps} />);

    const submitBtn = screen.getByRole('button', { name: /review your credit/i });
    expect(submitBtn).not.toBeDisabled();
    expect(submitBtn).toHaveClass('enabled');

    fireEvent.click(submitBtn);
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test('calls onReset and onSliderChange from SummarySlider controls', () => {
    render(<SummaryCard {...defaultProps} />);

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetBtn);
    expect(defaultProps.onReset).toHaveBeenCalledTimes(1);

    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: '400000' } });
    expect(defaultProps.onSliderChange).toHaveBeenCalledWith(400000);
  });
});
