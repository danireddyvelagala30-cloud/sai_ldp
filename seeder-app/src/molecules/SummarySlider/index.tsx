import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Slider } from '../../atoms/Slider';
import { formatCurrency } from '../../utils/currency';
import './style.css';

export interface SummarySliderProps {
  max: number;
  value: number;
  onChange: (val: number) => void;
  onReset: () => void;
}

export const SummarySlider: React.FC<SummarySliderProps> = ({ max, value, onChange, onReset }) => {
  const isResetDisabled = value === 0;

  return (
    <div className="summary-slider-wrapper">
      <div className="summary-slider-header">
        <Typography variant="body2" className="summary-slider-label-text">
          Slide to autoselect
        </Typography>
        <button
          className="summary-slider-reset-btn"
          onClick={onReset}
          disabled={isResetDisabled}
        >
          Reset
        </button>
      </div>

      <div className="summary-slider-track">
        <Slider
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>

      <div className="summary-slider-value-row">
        <span className="summary-slider-selected-value">{formatCurrency(value)}</span>
        <span className="summary-slider-of-label"> selected of </span>
        <span className="summary-slider-max-value">{formatCurrency(max)}</span>
      </div>
    </div>
  );
};
