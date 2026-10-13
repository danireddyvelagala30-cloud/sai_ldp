import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from './index';

describe('Sidebar Organism', () => {
  test('renders brand logo and title', () => {
    render(<Sidebar activePage="cash" onChangePage={() => {}} />);

    expect(screen.getByText('Seeder')).toBeInTheDocument();
    expect(screen.getByAltText('Seeder logo')).toBeInTheDocument();
  });

  test('renders navigation items', () => {
    render(<Sidebar activePage="cash" onChangePage={() => {}} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Cash Acceleration')).toBeInTheDocument();
  });

  test('calls onChangePage with "home" when Home is clicked', () => {
    const handleChangePage = jest.fn();
    render(<Sidebar activePage="cash" onChangePage={handleChangePage} />);

    const homeButton = screen.getByRole('button', { name: /home/i });
    fireEvent.click(homeButton);

    expect(handleChangePage).toHaveBeenCalledWith('home');
  });

  test('calls onChangePage with "cash" when Cash Acceleration is clicked', () => {
    const handleChangePage = jest.fn();
    render(<Sidebar activePage="home" onChangePage={handleChangePage} />);

    const cashButton = screen.getByRole('button', { name: /cash acceleration/i });
    fireEvent.click(cashButton);

    expect(handleChangePage).toHaveBeenCalledWith('cash');
  });

  test('highlights active navigation item', () => {
    const { rerender } = render(
      <Sidebar activePage="home" onChangePage={() => {}} />
    );

    const homeButton = screen.getByRole('button', { name: /home/i });
    const cashButton = screen.getByRole('button', { name: /cash acceleration/i });
    expect(homeButton).toHaveClass('active');
    expect(cashButton).not.toHaveClass('active');

    rerender(<Sidebar activePage="cash" onChangePage={() => {}} />);
    expect(screen.getByRole('button', { name: /home/i })).not.toHaveClass('active');
    expect(screen.getByRole('button', { name: /cash acceleration/i })).toHaveClass('active');
  });
});
