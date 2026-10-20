import React from "react";
import type { ChangeEvent } from "react";

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  ariaLabel?: string;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  ariaLabel = "Slider",
  className = "",
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={`atom-slider-container ${className}`.trim()}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        aria-label={ariaLabel}
        className="atom-slider"
      />
    </div>
  );
};

export default Slider;
