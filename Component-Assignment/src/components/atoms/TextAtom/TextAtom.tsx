interface TextProps {
  text: string;
}

const TextAtom = ({ text }: TextProps) => {
  return <span>{text}</span>;
};

export default TextAtom;