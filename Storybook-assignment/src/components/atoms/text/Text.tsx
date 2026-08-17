interface TextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "lighter";
}

const Text = ({
  text,
  color = "#000000",
  fontSize = 18,
  fontWeight = "normal",
}: TextProps) => {
  return (
    <span
      style={{
        color,
        fontSize: `${fontSize}px`,
        fontWeight,
      }}
    >
      {text}
    </span>
  );
};

export default Text;
