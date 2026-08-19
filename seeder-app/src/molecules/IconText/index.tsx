import React from 'react';
import { Typography } from '../../atoms/Typography';
import './style.css';

export interface IconTextProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export const IconText: React.FC<IconTextProps> = ({ icon, text, active, onClick }) => {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="nav-icon icon-text-nav-icon">
        {icon}
      </span>
      <Typography className="icon-text-label">
        {text}
      </Typography>
    </button>
  );
};
