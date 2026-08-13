import React from 'react';
import { Header } from '../../organisms/Header';
import { Typography } from '../../atoms/Typography';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Header
        title="Welcome to Seeder"
        subtitle="Manage your SaaS cash acceleration and contracts smoothly."
      />
      <div style={{ marginTop: '32px' }}>
        <Typography variant="body1">
          Select Cash Acceleration from the sidebar to manage your contracts and initiate cash kicks.
        </Typography>
      </div>
    </div>
  );
};
