import React from 'react';
import './style.css';

export interface IconProps {
  name?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, children, className = '' }) => {
  if (children) {
    return <span className={`custom-icon nav-icon ${className}`.trim()}>{children}</span>;
  }
  return <span className={`custom-icon nav-icon ${className}`.trim()}>{name}</span>;
};
