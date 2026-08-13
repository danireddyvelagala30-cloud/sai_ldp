import React from 'react';
import { Typography } from '../../atoms/Typography';

export interface IconTextProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export const IconText: React.FC<IconTextProps> = ({ icon, text, active, onClick }) => {
  return (
    <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="nav-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </span>
      <Typography style={{ color: active ? '#f7f6ff' : '#c5c4d1', fontWeight: active ? 600 : 400 }}>
        {text}
      </Typography>
    </button>
  );
};
