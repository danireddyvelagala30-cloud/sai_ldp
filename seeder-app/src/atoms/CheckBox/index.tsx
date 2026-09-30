import React from 'react';
import './style.css';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, className = '', ...props }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`custom-checkbox ${className}`.trim()}
      {...props}
    />
  );
};
