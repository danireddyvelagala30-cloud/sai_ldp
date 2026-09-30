import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './index';

describe('HomePage', () => {
  test('renders header title and subtitle', () => {
    render(<HomePage />);

    expect(screen.getByRole('heading', { level: 1, name: /welcome to seeder/i })).toBeInTheDocument();
    expect(screen.getByText(/manage your saas cash acceleration and contracts smoothly/i)).toBeInTheDocument();
  });

  test('renders description text instructions', () => {
    render(<HomePage />);

    expect(
      screen.getByText(/select cash acceleration from the sidebar to manage your contracts and initiate cash kicks/i)
    ).toBeInTheDocument();
  });
});
