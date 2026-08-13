import React from 'react';
import { Typography } from '../../atoms/Typography';
import { Button } from '../../atoms/Button';
import { SummarySlider } from '../../molecules/SummarySlider';
import { formatCurrency } from '../../utils/currency';

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <Typography variant="h2" style={{ fontSize: '1.35rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>
          Summary
        </Typography>
        <span style={{ color: '#727080', cursor: 'pointer', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="#727080" strokeWidth="1.5" />
            <path d="M8 7.5V11" stroke="#727080" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="5" r="0.75" fill="#727080" />
          </svg>
        </span>
      </div>

      <div className="summary-row small-label" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <Typography variant="body2" style={{ color: '#a5a2b8', fontSize: '0.95rem' }}>Term</Typography>
        <Typography variant="body2" style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>12 months</Typography>
      </div>

      <div className="summary-row small-label" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <Typography variant="body2" style={{ color: '#a5a2b8', fontSize: '0.95rem' }}>Selected contracts</Typography>
        <Typography variant="body2" style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>{selectedCount}</Typography>
      </div>

      <SummarySlider
        max={maxTotal}
        value={sliderValue}
        onChange={onSliderChange}
        onReset={onReset}
      />

      <div className="summary-row small-label" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <Typography variant="body2" style={{ color: '#a5a2b8', fontSize: '0.95rem' }}>Pay back amount</Typography>
        <Typography variant="body2" style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>{formatCurrency(paybackAmount)}</Typography>
      </div>

      <div className="summary-row small-label" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
        <Typography variant="body2" style={{ color: '#a5a2b8', fontSize: '0.95rem' }}>Rate %</Typography>
        <Typography variant="body2" style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>
          <span style={{ color: '#727080', fontSize: '0.85rem', marginRight: '6px' }}>({feeRate.toFixed(2)}%)</span>
          {formatCurrency(fee)}
        </Typography>
      </div>

      <div className="summary-total" style={{ margin: '20px 0 24px 0', borderTop: '1px solid #201f2d', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" style={{ fontWeight: 500, fontSize: '1.15rem', color: '#a5a2b8' }}>Total Payable</Typography>
        <Typography variant="body1" style={{ fontWeight: 700, fontSize: '1.45rem', color: '#ffffff' }}>{formatCurrency(totalPayable)}</Typography>
      </div>

      <Button
        variant="primary"
        onClick={onSubmit}
        disabled={!isEnabled}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: '14px',
          fontSize: '1rem',
          fontWeight: 600,
          background: isEnabled ? '#6C5DD3' : '#413c77',
          color: isEnabled ? '#ffffff' : '#727080',
          border: 'none',
          cursor: isEnabled ? 'pointer' : 'default',
          transition: 'all 0.15s ease',
        }}
      >
        Review Your Credit
      </Button>
    </div>
  );
};
