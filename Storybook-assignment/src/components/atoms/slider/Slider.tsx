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
  const percentage = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min || 1)) * 100)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(Number(e.target.value));
  };

  return (
    <div className={`atom-slider-container ${className}`}>
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
        style={{
          background: `linear-gradient(to right, #6C5DD3 0%, #6C5DD3 ${percentage}%, #33323B ${percentage}%, #33323B 100%)`,
        }}
      />
    </div>
  );
};

export default Slider;
