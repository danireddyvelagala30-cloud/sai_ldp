import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IconText } from './index';

describe('IconText Molecule', () => {
  test('renders text label and icon', () => {
    render(
      <IconText
        icon={<span data-testid="test-icon">icon</span>}
        text="Dashboard"
      />
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('applies active class when active prop is true', () => {
    render(
      <IconText
        icon={<span>*</span>}
        text="Cash Acceleration"
        active={true}
      />
    );

    const button = screen.getByRole('button', { name: /cash acceleration/i });
    expect(button).toHaveClass('active');
  });

  test('does not apply active class when active prop is false or omitted', () => {
    render(
      <IconText
        icon={<span>*</span>}
        text="Home"
      />
    );

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).not.toHaveClass('active');
  });

  test('triggers onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(
      <IconText
        icon={<span>*</span>}
        text="Home"
        onClick={handleClick}
      />
    );

    const button = screen.getByRole('button', { name: /home/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
