import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from './index';

describe('Typography Atom', () => {
  test('renders default body1 variant as span', () => {
    render(<Typography>Default Text</Typography>);
    const textElement = screen.getByText('Default Text');
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName.toLowerCase()).toBe('span');
    expect(textElement).toHaveClass('typography-body1');
  });

  test('renders h1 variant as h1 element', () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    const heading = screen.getByRole('heading', { level: 1, name: 'Heading 1' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('typography-h1');
  });

  test('renders h2 variant as h2 element', () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    const heading = screen.getByRole('heading', { level: 2, name: 'Heading 2' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('typography-h2');
  });

  test('renders title variant as div with panel-title class', () => {
    render(<Typography variant="title">Panel Title</Typography>);
    const titleElement = screen.getByText('Panel Title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName.toLowerCase()).toBe('div');
    expect(titleElement).toHaveClass('panel-title', 'typography-title');
  });

  test('renders caption variant as span with typography-caption class', () => {
    render(<Typography variant="caption">Caption Text</Typography>);
    const caption = screen.getByText('Caption Text');
    expect(caption).toBeInTheDocument();
    expect(caption.tagName.toLowerCase()).toBe('span');
    expect(caption).toHaveClass('typography-caption');
  });

  test('appends custom className when provided', () => {
    render(<Typography className="muted-text">Custom Text</Typography>);
    const textElement = screen.getByText('Custom Text');
    expect(textElement).toHaveClass('typography-body1', 'muted-text');
  });

  test('applies custom inline styles when style prop is provided', () => {
    render(<Typography style={{ color: 'red' }}>Styled Text</Typography>);
    const textElement = screen.getByText('Styled Text');
    expect(textElement).toHaveStyle({ color: 'red' });
  });
});
