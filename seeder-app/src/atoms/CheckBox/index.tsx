import React from 'react';

export interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, ...props }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
};
