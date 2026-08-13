import React from 'react';
import { CheckBox } from '../../atoms/CheckBox';
import { Typography } from '../../atoms/Typography';
import { Contract } from '../../types/Contract';
import { formatCurrency } from '../../utils/currency';

export interface ContractRowProps {
  contract: Contract;
  selected: boolean;
  onToggle: (id: number) => void;
}

export const ContractRow: React.FC<ContractRowProps> = ({ contract, selected, onToggle }) => {
  return (
    <div
      className="contracts-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '50px 1fr 1fr 1fr 1fr 1fr',
        gap: '16px',
        alignItems: 'center',
        padding: '14px 16px',
        background: '#14131e',
        borderRadius: '12px',
        border: selected ? '1px solid #6C5DD3' : '1px solid transparent',
        transition: 'border-color 0.15s ease, background 0.15s ease',
      }}
    >
      <div className="contract-check" style={{ display: 'flex', justifyContent: 'center' }}>
        <CheckBox checked={selected} onChange={() => onToggle(contract.id)} />
      </div>
      <div className="contracts-cell">
        <Typography style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.95rem' }}>{contract.name}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography style={{ color: '#a5a2b8', fontSize: '0.9rem' }}>{contract.type}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography style={{ color: '#ffffff', fontSize: '0.95rem' }}>{formatCurrency(contract.perPayment)}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography style={{ color: '#ffffff', fontSize: '0.95rem', display: 'block' }}>{contract.term}</Typography>
        <Typography style={{ color: '#a5a2b8', fontSize: '0.8rem', marginTop: '2px', display: 'block' }}>
          {(contract.feeRate || 12.0).toFixed(1)}% fee
        </Typography>
      </div>
      <div className="contracts-cell">
        <Typography style={{ color: '#ffffff', fontWeight: 500, fontSize: '0.95rem' }}>{formatCurrency(contract.amount)}</Typography>
      </div>
    </div>
  );
};
