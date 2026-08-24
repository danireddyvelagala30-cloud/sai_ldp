import React from "react";

export interface TextProps {
  text?: string;
  children?: React.ReactNode;
  variant?: "muted" | "white" | "light" | "primary";
  fontWeight?: "normal" | "bold" | "lighter";
  fontSize?: number;
  color?: string;
  className?: string;
}

const Text: React.FC<TextProps> = ({
  text,
  children,
  variant,
  fontWeight = "normal",
  fontSize,
  color,
  className = "",
}) => {
  const classes = [
    "atom-text",
    `atom-text--${fontWeight}`,
    variant ? `atom-text--${variant}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const dynamicStyle: React.CSSProperties = {};
  if (color) dynamicStyle.color = color;
  if (fontSize) dynamicStyle.fontSize = `${fontSize}px`;

  return (
    <span
      className={classes}
      style={Object.keys(dynamicStyle).length > 0 ? dynamicStyle : undefined}
    >
      {text || children}
    </span>
  );
};

export default Text;
