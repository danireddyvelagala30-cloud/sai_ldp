import React from 'react';

export interface IconProps {
  name?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, children, className = '' }) => {
  if (children) {
    return <span className={`nav-icon ${className}`.trim()}>{children}</span>;
  }
  return <span className={`nav-icon ${className}`.trim()}>{name}</span>;
};
