import React from 'react';
import './style.css';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'body1' | 'body2' | 'caption' | 'title';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  children,
  className = '',
  style,
}) => {
  const variantClass = `typography-${variant}`;
  const combinedClass = `${variantClass} ${className}`.trim();

  if (variant === 'h1') {
    return <h1 className={combinedClass} style={style}>{children}</h1>;
  }
  if (variant === 'h2') {
    return <h2 className={combinedClass} style={style}>{children}</h2>;
  }
  if (variant === 'title') {
    return <div className={`panel-title ${combinedClass}`} style={style}>{children}</div>;
  }
  return <span className={combinedClass} style={style}>{children}</span>;
};
