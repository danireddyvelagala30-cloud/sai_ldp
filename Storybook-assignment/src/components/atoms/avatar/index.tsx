import React from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  shape?: "circle" | "rounded";
  fallback?: string;
  showDropdown?: boolean;
  className?: string;
  onClick?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User avatar",
  size = "medium",
  shape = "circle",
  fallback = "U",
  showDropdown = false,
  className = "",
  onClick,
}) => {
  const containerClasses = [
    "atom-avatar-container",
    onClick ? "atom-avatar-container--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const avatarClasses = [
    "atom-avatar",
    `atom-avatar--${shape}`,
    `atom-avatar--${size}`,
  ].join(" ");

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={avatarClasses}>
        {src ? (
          <img src={src} alt={alt} className="atom-avatar-img" />
        ) : (
          <span className="atom-avatar-fallback">{fallback}</span>
        )}
      </div>
      {showDropdown && (
        <svg
          className="atom-avatar-dropdown-icon"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </div>
  );
};

export default Avatar;
