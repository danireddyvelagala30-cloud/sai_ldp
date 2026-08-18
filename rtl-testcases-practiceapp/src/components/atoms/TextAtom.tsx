interface TextAtomProps {
  children: React.ReactNode;
  as?: "p" | "span" | "h1" | "h2" | "h3";
}

const TextAtom = ({
  children,
  as = "p",
}: TextAtomProps) => {
  const Component = as;

  return <Component>{children}</Component>;
};

export default TextAtom;