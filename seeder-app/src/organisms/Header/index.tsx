import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { UserProfile } from '../../molecules/UserProfile';
import './style.css';

export interface HeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack }) => {
  return (
    <div className="header-row">
      <div className="header-left">
        <div className="header-heading">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </div>
        {onBack && (
          <Button variant="text" onClick={onBack} className="header-back-btn">
            <span className="header-back-icon">←</span> Back
          </Button>
        )}
      </div>
      <UserProfile />
    </div>
  );
};
