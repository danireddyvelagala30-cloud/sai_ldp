import React from 'react';
import { CheckBox } from '../../atoms/CheckBox';
import { Typography } from '../../atoms/Typography';
import { Contract } from '../../types/Contract';
import { formatCurrency } from '../../utils/currency';
import './style.css';

export interface ContractRowProps {
  contract: Contract;
  selected: boolean;
  onToggle: (id: number) => void;
}

export const ContractRow: React.FC<ContractRowProps> = ({ contract, selected, onToggle }) => {
  return (
    <div data-testid="contract-row" className={`contracts-row contract-row ${selected ? 'selected' : ''}`}>
      <div className="contract-check contract-row-check">
        <CheckBox checked={selected} onChange={() => onToggle(contract.id)} />
      </div>
      <div className="contracts-cell">
        <Typography className="contract-row-name">{contract.name}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography className="contract-row-type">{contract.type}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography className="contract-row-payment">{formatCurrency(contract.perPayment)}</Typography>
      </div>
      <div className="contracts-cell">
        <Typography className="contract-row-term-primary">{contract.term}</Typography>
        <Typography className="contract-row-term-fee">
          {(contract.feeRate || 12.0).toFixed(1)}% fee
        </Typography>
      </div>
      <div className="contracts-cell">
        <Typography className="contract-row-amount">{formatCurrency(contract.amount)}</Typography>
      </div>
    </div>
  );
};
