import React from 'react';
import './style.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseClass =
    variant === 'primary'
      ? 'review-button custom-btn-primary'
      : variant === 'secondary'
      ? 'reset-button custom-btn-secondary'
      : 'hero-back custom-btn-text';
  return (
    <button className={`custom-btn ${baseClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};
