import React from 'react';
import { Typography } from '../../atoms/Typography';
import { IconText } from '../../molecules/IconText';

export interface SidebarProps {
  activePage: 'home' | 'cash';
  onChangePage: (page: 'home' | 'cash') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onChangePage }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div className="sidebar-brand-icon" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/icon.svg" alt="Seeder logo" width="28" height="26" />
        </div>
        <Typography variant="h2" className="sidebar-logo" style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
          Seeder
        </Typography>
      </div>
      <div className="sidebar-nav">
        <IconText
          icon={<img src="/home-2.svg" alt="Home" width="18" height="18" />}
          text="Home"
          active={activePage === 'home'}
          onClick={() => onChangePage('home')}
        />
        <IconText
          icon={<img src="/coin.svg" alt="Cash Acceleration" width="18" height="18" />}
          text="Cash Acceleration"
          active={activePage === 'cash'}
          onClick={() => onChangePage('cash')}
        />
      </div>
    </div>
  );
};
