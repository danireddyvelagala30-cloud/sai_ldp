import React from 'react';

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
  if (variant === 'h1') {
    return <h1 className={className} style={style}>{children}</h1>;
  }
  if (variant === 'title') {
    return <div className={`panel-title ${className}`.trim()} style={style}>{children}</div>;
  }
  return <span className={className} style={style}>{children}</span>;
};
