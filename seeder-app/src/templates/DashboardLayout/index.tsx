import React from 'react';

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  return (
    <div data-testid="dashboard-layout-container" className="dashboard-layout-container">
      {sidebar}
      <main className="dashboard-layout-main">
        {children}
      </main>
    </div>
  );
};
