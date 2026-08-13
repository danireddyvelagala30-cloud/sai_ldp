import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { UserProfile } from '../../molecules/UserProfile';

export interface HeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack }) => {
  return (
    <div className="hero-row">
      <div className="hero-left">
        <div className="hero-heading">
          <Typography variant="h1">{title}</Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </div>
        {onBack && (
          <Button variant="text" onClick={onBack}>
            <span className="back-icon">←</span> Back
          </Button>
        )}
      </div>
      <UserProfile />
    </div>
  );
};
