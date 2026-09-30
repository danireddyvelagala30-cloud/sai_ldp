import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { SummarySlider } from '../../molecules/SummarySlider';
import { formatCurrency } from '../../utils/currency';
import './style.css';

export interface SummaryCardProps {
  selectedCount: number;
  selectedTotal: number;
  maxTotal: number;
  sliderValue: number;
  onSliderChange: (val: number) => void;
  onReset: () => void;
  onSubmit: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  selectedCount,
  selectedTotal,
  maxTotal,
  sliderValue,
  onSliderChange,
  onReset,
  onSubmit,
}) => {
  const feeRate = selectedCount > 0 ? 12.0 : 0.0;
  const fee = selectedTotal * (feeRate / 100);
  const paybackAmount = selectedTotal;
  const totalPayable = paybackAmount + fee;
  const isEnabled = selectedCount > 0;

  return (
    <div className="summary-panel">
      <div className="summary-card-header">
        <Typography variant="h2" className="summary-card-title">
          Summary
        </Typography>
        <span className="summary-card-info-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="#727080" strokeWidth="1.5" />
            <path d="M8 7.5V11" stroke="#727080" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.75" fill="#727080" />
          </svg>
        </span>
      </div>

      <div className="summary-row small-label summary-card-row">
        <Typography variant="body2" className="summary-card-label">Term</Typography>
        <Typography variant="body2" className="summary-card-value">12 months</Typography>
      </div>

      <div className="summary-row small-label summary-card-row">
        <Typography variant="body2" className="summary-card-label">Selected contracts</Typography>
        <Typography variant="body2" className="summary-card-value">{selectedCount}</Typography>
      </div>

      <SummarySlider
        max={maxTotal}
        value={sliderValue}
        onChange={onSliderChange}
        onReset={onReset}
      />

      <div className="summary-row small-label summary-card-row">
        <Typography variant="body2" className="summary-card-label">Pay back amount</Typography>
        <Typography variant="body2" className="summary-card-value">{formatCurrency(paybackAmount)}</Typography>
      </div>

      <div className="summary-row small-label summary-card-row">
        <Typography variant="body2" className="summary-card-label">Rate %</Typography>
        <Typography variant="body2" className="summary-card-value">
          <span className="summary-card-rate-pct">({feeRate.toFixed(2)}%)</span>
          {formatCurrency(fee)}
        </Typography>
      </div>

      <div className="summary-total summary-card-total-row">
        <Typography variant="body1" className="summary-card-total-label">Total Payable</Typography>
        <Typography variant="body1" className="summary-card-total-val">{formatCurrency(totalPayable)}</Typography>
      </div>

      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={!isEnabled}
        className={`summary-card-submit-btn ${isEnabled ? 'enabled' : 'disabled'}`}
      >
        Review Your Credit
      </Button>
    </div>
  );
};
