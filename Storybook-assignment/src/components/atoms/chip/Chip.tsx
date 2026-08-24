import React from "react";

export type ChipVariant = "default" | "subtle" | "purple" | "outline" | "fee";
export type ChipSize = "small" | "medium";

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = "default",
  size = "small",
  icon,
  className = "",
  onClick,
}) => {
  const classes = [
    "atom-chip",
    `atom-chip--${variant}`,
    `atom-chip--${size}`,
    onClick ? "atom-chip--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} onClick={onClick}>
      {icon && <span className="atom-chip-icon">{icon}</span>}
      {label}
    </span>
  );
};

export default Chip;
