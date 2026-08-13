import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Slider } from '../../atoms/Slider';
import { formatCurrency } from '../../utils/currency';

export interface SummarySliderProps {
  max: number;
  value: number;
  onChange: (val: number) => void;
  onReset: () => void;
}

export const SummarySlider: React.FC<SummarySliderProps> = ({ max, value, onChange, onReset }) => {
  const isResetDisabled = value === 0;

  return (
    <div style={{ margin: '16px 0' }}>
      <div className="summary-slider-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <Typography variant="body2" style={{ color: '#a5a2b8', fontSize: '0.95rem' }}>
          Slide to autoselect
        </Typography>
        <button
          className="reset-button"
          onClick={onReset}
          disabled={isResetDisabled}
          style={{
            border: 'none',
            background: '#201f2d',
            color: isResetDisabled ? '#454359' : '#8a84ff',
            padding: '6px 16px',
            borderRadius: '12px',
            cursor: isResetDisabled ? 'default' : 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'color 0.15s ease',
          }}
        >
          Reset
        </button>
      </div>

      <div className="slider-wrapper" style={{ margin: '12px 0' }}>
        <Slider
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: '20px', fontSize: '0.95rem' }}>
        <span style={{ color: '#a29bff', fontWeight: 600 }}>{formatCurrency(value)}</span>
        <span style={{ color: '#a5a2b8' }}> selected of </span>
        <span style={{ color: '#ffffff', fontWeight: 600 }}>{formatCurrency(max)}</span>
      </div>
    </div>
  );
};
