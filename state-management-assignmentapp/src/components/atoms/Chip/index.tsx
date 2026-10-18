import { Chip as MuiChip } from "@mui/material";
import type { ChipProps as MuiChipProps } from "@mui/material";
import { APP_CONSTANTS } from "../../../utils/constants";
import { styles } from "./styles";

interface ChipProps extends Pick<MuiChipProps, "color" | "size" | "variant"> {
  label: string;
  appearance?: "default" | "status";
}

const Chip = ({
  label,
  appearance = "default",
  color = "primary",
  size = "small",
  variant,
}: ChipProps) => {
  if (!label) return null;

  const isClear = label.toUpperCase() === APP_CONSTANTS.candidateStatusClear;
  const isStatus = appearance === "status";

  return (
    <MuiChip
      label={label}
      size={size}
      color={isStatus ? (isClear ? "success" : "warning") : color}
      variant={variant ?? (isStatus ? "filled" : "outlined")}
      sx={isStatus ? styles.status : styles.root}
    />
  );
};

export default Chip;
