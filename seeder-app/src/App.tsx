import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme/theme';
import { Sidebar } from './organisms/Sidebar';
import { DashboardLayout } from './templates/DashboardLayout';
import { NewCashKickPage } from './pages/NewCashKickPage';
import { HomePage } from './pages/HomePage';

function App() {
  const [activePage, setActivePage] = useState<'home' | 'cash'>('cash');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DashboardLayout sidebar={<Sidebar activePage={activePage} onChangePage={setActivePage} />}>
        {activePage === 'cash' ? <NewCashKickPage /> : <HomePage />}
      </DashboardLayout>
    </ThemeProvider>
  );
}

export default App;
