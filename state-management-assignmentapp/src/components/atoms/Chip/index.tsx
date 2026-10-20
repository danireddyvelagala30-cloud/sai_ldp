import { Chip as MuiChip } from "@mui/material";
import type { ChipProps as MuiChipProps } from "@mui/material";
import { APP_CONSTANTS } from "../../../utils/constants";

export interface ChipProps extends Omit<MuiChipProps, "label"> {
  label: string;
  appearance?: "default" | "status";
}

const Chip = ({
  label,
  appearance = "default",
  color = "primary",
  size = "small",
  variant,
  ...rest
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
      {...rest}
    />
  );
};

export default Chip;

