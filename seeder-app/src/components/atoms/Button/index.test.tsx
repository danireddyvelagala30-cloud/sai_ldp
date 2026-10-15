import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button Atom', () => {
  test('renders button with children text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const buttonElement = screen.getByRole('button', { name: /primary/i });
    expect(buttonElement).toHaveClass('custom-btn', 'review-button', 'custom-btn-primary');
  });

  test('applies secondary variant classes when variant="secondary"', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const buttonElement = screen.getByRole('button', { name: /secondary/i });
    expect(buttonElement).toHaveClass('custom-btn', 'reset-button', 'custom-btn-secondary');
  });

  test('applies text variant classes when variant="text"', () => {
    render(<Button variant="text">Back</Button>);
    const buttonElement = screen.getByRole('button', { name: /back/i });
    expect(buttonElement).toHaveClass('custom-btn', 'hero-back', 'custom-btn-text');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(buttonElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not trigger onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const buttonElement = screen.getByRole('button', { name: /disabled button/i });
    expect(buttonElement).toBeDisabled();
    
    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('appends custom className when provided', () => {
    render(<Button className="my-custom-class">Custom</Button>);
    const buttonElement = screen.getByRole('button', { name: /custom/i });
    expect(buttonElement).toHaveClass('my-custom-class');
  });
});
