import React from 'react';
import { Box } from '@mui/material';

export interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#09090f' }}>
      {sidebar}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          boxSizing: 'border-box',
          minWidth: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
