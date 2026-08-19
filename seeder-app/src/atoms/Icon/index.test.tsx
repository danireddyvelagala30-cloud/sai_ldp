import React from 'react';
import { render, screen } from '@testing-library/react';
import { Icon } from './index';

describe('Icon Atom', () => {
  test('renders icon with text name when name prop is provided', () => {
    render(<Icon name="home_icon" />);
    const iconElement = screen.getByText('home_icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('custom-icon', 'nav-icon');
  });

  test('renders children when passed instead of name', () => {
    render(
      <Icon>
        <span data-testid="svg-icon">⭐</span>
      </Icon>
    );
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  test('appends custom className when provided', () => {
    render(<Icon name="search" className="active-icon" />);
    const iconElement = screen.getByText('search');
    expect(iconElement).toHaveClass('custom-icon', 'nav-icon', 'active-icon');
  });
});
