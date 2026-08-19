import React from 'react';
import { CheckBox } from '../../atoms/CheckBox';
import { Typography } from '../../atoms/Typography';
import { ContractRow } from '../../molecules/ContractRow';
import { Contract } from '../../types/Contract';
import './style.css';

export interface ContractsTableProps {
  contracts: Contract[];
  selectedIds: number[];
  allSelected: boolean;
  onToggleAll: () => void;
  onToggleOne: (id: number) => void;
}

export const ContractsTable: React.FC<ContractsTableProps> = ({
  contracts,
  selectedIds,
  allSelected,
  onToggleAll,
  onToggleOne,
}) => {
  return (
    <div className="contracts-panel">
      <div className="contracts-panel-header">
        <div className="contracts-table-header-row">
          <Typography variant="h2" className="contracts-table-title">
            Your Contracts
          </Typography>
          <span className="contracts-table-info-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#727080" strokeWidth="1.5" />
              <path d="M8 7.5V11" stroke="#727080" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="#727080" />
            </svg>
          </span>
        </div>
        <div className="contracts-row contracts-header contracts-table-col-headers">
          <div className="contract-check contracts-table-col-check">
            <CheckBox checked={allSelected} onChange={onToggleAll} />
          </div>
          <div className="contracts-cell"><Typography className="contracts-table-col-label">Name</Typography></div>
          <div className="contracts-cell"><Typography className="contracts-table-col-label">Type</Typography></div>
          <div className="contracts-cell"><Typography className="contracts-table-col-label">Per payment</Typography></div>
          <div className="contracts-cell"><Typography className="contracts-table-col-label">Term length</Typography></div>
          <div className="contracts-cell"><Typography className="contracts-table-col-label">Payment amount</Typography></div>
        </div>
      </div>

      <div className="contracts-list">
        {contracts.map((contract) => (
          <ContractRow
            key={contract.id}
            contract={contract}
            selected={selectedIds.includes(contract.id)}
            onToggle={onToggleOne}
          />
        ))}
      </div>
    </div>
  );
};
