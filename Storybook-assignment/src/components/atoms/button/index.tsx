import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "back"
  | "reset"
  | "ghost"
  | "nav";

export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  active = false,
  onClick,
  ariaLabel,
  className = "",
}) => {
  const classes = [
    "atom-button",
    `atom-button--${variant}`,
    `atom-button--${size}`,
    fullWidth ? "atom-button--full-width" : "",
    variant === "nav" && active ? "atom-button--nav-active" : "",
    disabled ? "atom-button--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {startIcon && <span className="atom-button-icon">{startIcon}</span>}
      {children || label}
      {endIcon && <span className="atom-button-icon">{endIcon}</span>}
    </button>
  );
};

export default Button;
