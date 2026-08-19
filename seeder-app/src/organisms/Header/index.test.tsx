import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './index';

describe('Header Organism', () => {
  test('renders title, subtitle, and user profile', () => {
    render(
      <Header
        title="New cash kick"
        subtitle="Let's setup a new cash kick to power your SaaS"
      />
    );

    expect(screen.getByRole('heading', { level: 1, name: /new cash kick/i })).toBeInTheDocument();
    expect(screen.getByText(/let's setup a new cash kick to power your saas/i)).toBeInTheDocument();
    expect(screen.getByAltText('User Profile')).toBeInTheDocument();
  });

  test('does not render back button when onBack is not provided', () => {
    render(
      <Header
        title="Welcome to Seeder"
        subtitle="Manage your SaaS"
      />
    );

    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
  });

  test('renders back button and handles onBack click', () => {
    const handleBack = jest.fn();
    render(
      <Header
        title="New cash kick"
        subtitle="Subtitle"
        onBack={handleBack}
      />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
