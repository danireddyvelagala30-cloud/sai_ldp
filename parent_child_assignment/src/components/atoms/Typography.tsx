interface TypographyProps {
  label: string;
  value: string;
}

const Typography = ({ label, value }: TypographyProps) => {
  return (
    <div>
      <p
        style={{
          color: "gray",
          margin: 0,
        }}
      >
        {label}
      </p>

      <h4
        style={{
          margin: "5px 0",
        }}
      >
        {value}
      </h4>
    </div>
  );
};

export default Typography;