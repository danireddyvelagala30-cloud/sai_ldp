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

  return (
    <span className={classes}>
      {text || children}
    </span>
  );
};

export type TypographyProps = TextProps;
export const Typography = Text;
export { Text };
export default Typography;

