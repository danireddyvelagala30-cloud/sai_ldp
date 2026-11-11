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
  className = "",
  onClick,
}) => {
  const avatarClasses = [
    "atom-avatar",
    `atom-avatar--${shape}`,
    `atom-avatar--${size}`,
    onClick ? "atom-avatar--clickable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={avatarClasses} onClick={onClick}>
      {src ? (
        <img src={src} alt={alt} className="atom-avatar-img" />
      ) : (
        <span className="atom-avatar-fallback">{fallback}</span>
      )}
    </div>
  );
};

export default Avatar;
