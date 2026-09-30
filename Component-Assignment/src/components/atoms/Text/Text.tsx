interface TextProps {
  text: string;
}

const Text = ({ text }: TextProps) => {
  return <span>{text}</span>;
};

export default Text;
