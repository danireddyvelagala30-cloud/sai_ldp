import React from "react";

export type IconName =
  | "logo"
  | "home"
  | "cash-acceleration"
  | "back"
  | "info"
  | "lightning"
  | "chevron-down"
  | "check";

export interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = "currentColor",
  className = "",
  onClick,
}) => {
  const pixelSize = typeof size === "number" ? `${size}px` : size;

  const renderSvg = () => {
    switch (name) {
      case "logo":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="28" height="28" rx="6" fill="#6C5DD3" fillOpacity="0.15" />
            <path
              d="M7 10C7 7.79086 8.79086 6 11 6H17C19.2091 6 21 7.79086 21 10V11C21 13.2091 19.2091 15 17 15H11C8.79086 15 7 13.2091 7 11V10Z"
              fill="#6C5DD3"
            />
            <path
              d="M7 17C7 14.7909 8.79086 13 11 13H17C19.2091 13 21 14.7909 21 17V18C21 20.2091 19.2091 22 17 22H11C8.79086 22 7 20.2091 7 18V17Z"
              fill="#9C8EFF"
            />
          </svg>
        );

      case "home":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );

      case "cash-acceleration":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        );

      case "back":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        );

      case "info":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );

      case "lightning":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );

      case "chevron-down":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        );

      case "check":
        return (
          <svg
            width={pixelSize}
            height={pixelSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );

      default:
        return null;
    }
  };

  const classes = [
    "atom-icon",
    onClick ? "atom-icon--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} onClick={onClick}>
      {renderSvg()}
    </span>
  );
};

export default Icon;
