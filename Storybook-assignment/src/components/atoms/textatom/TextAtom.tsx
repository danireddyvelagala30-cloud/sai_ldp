interface TextAtomProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "lighter";
}

const TextAtom = ({
  text,
  color = "#000000",
  fontSize = 18,
  fontWeight = "normal",
}: TextAtomProps) => {
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

export default TextAtom;
