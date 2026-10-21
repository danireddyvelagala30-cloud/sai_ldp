import React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from './index';

describe('DashboardLayout Template', () => {
  test('renders sidebar and children in layout containers', () => {
    render(
      <DashboardLayout sidebar={<aside data-testid="test-sidebar">Sidebar Content</aside>}>
        <div data-testid="test-children">Main Dashboard View</div>
      </DashboardLayout>
    );

    expect(screen.getByTestId('test-sidebar')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Main Dashboard View')).toBeInTheDocument();
  });

  test('applies layout CSS classes', () => {
    render(
      <DashboardLayout sidebar={<div>Nav</div>}>
        <div>Body</div>
      </DashboardLayout>
    );

    expect(screen.getByTestId('dashboard-layout-container')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('dashboard-layout-main');
  });
});
