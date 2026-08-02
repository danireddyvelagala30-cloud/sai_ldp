interface TextAtomProps {
  text: string;
}

const TextAtom = ({ text }: TextAtomProps) => {
  return <span>{text}</span>;
};

export default TextAtom;