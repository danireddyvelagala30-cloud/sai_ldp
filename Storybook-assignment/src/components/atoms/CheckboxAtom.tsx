interface CheckboxAtomProps {
  checked?: boolean;
}

const CheckboxAtom = ({ checked = false }: CheckboxAtomProps) => {
  return <input type="checkbox" defaultChecked={checked} />;
};

export default CheckboxAtom;