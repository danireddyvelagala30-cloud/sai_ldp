import type { ReactNode } from "react";

interface StackProps {
  children?: ReactNode;
  direction?: "row" | "column";
  spacing?: number;
  wrap?: boolean;
}

const Stack = ({
  children,
  direction = "column",
  spacing = 10,
  wrap = false,
}: StackProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `${spacing}px`,
        flexWrap: wrap ? "wrap" : "nowrap",
      }}
    >
      {children}
    </div>
  );
};

export default Stack;