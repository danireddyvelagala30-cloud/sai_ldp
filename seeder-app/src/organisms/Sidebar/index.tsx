import React from 'react';
import { Typography } from '../../atoms/Typography';
import { IconText } from '../../molecules/IconText';
import './style.css';

export interface SidebarProps {
  activePage: 'home' | 'cash';
  onChangePage: (page: 'home' | 'cash') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onChangePage }) => {
  return (
    <div className="sidebar sidebar-container">
      <div className="sidebar-brand sidebar-brand-wrapper">
        <div className="sidebar-brand-icon sidebar-logo-icon">
          <img src="/icon.svg" alt="Seeder logo" width="28" height="26" />
        </div>
        <Typography variant="h2" className="sidebar-logo sidebar-brand-title">
          Seeder
        </Typography>
      </div>
      <div className="sidebar-nav sidebar-nav-list">
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
