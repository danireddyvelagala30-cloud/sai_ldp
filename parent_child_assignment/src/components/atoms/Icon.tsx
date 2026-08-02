interface IconProps {
  icon: React.ReactNode;
}

const Icon = ({ icon }: IconProps) => {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "#4f46e5",
      }}
    >
      {icon}
    </div>
  );
};

export default Icon;