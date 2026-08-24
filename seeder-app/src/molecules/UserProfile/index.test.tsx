import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProfile } from './index';

describe('UserProfile Molecule', () => {
  test('renders user avatar with default image src', () => {
    render(<UserProfile />);
    const avatar = screen.getByAltText('User Profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/77a624073ed39ebd7f349c74e281d671ea53c5c6.png');
  });

  test('renders user avatar with custom avatarUrl', () => {
    render(<UserProfile avatarUrl="/custom-avatar.png" />);
    const avatar = screen.getByAltText('User Profile');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', '/custom-avatar.png');
  });

  test('renders dropdown arrow icon', () => {
    render(<UserProfile />);
    const arrow = screen.getByAltText('Dropdown arrow');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveAttribute('src', '/arrow-bottom.svg');
  });
});
