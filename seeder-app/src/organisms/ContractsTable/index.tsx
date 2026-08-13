import React from 'react';
import { CheckBox } from '../../atoms/CheckBox';
import { Typography } from '../../atoms/Typography';
import { ContractRow } from '../../molecules/ContractRow';
import { Contract } from '../../types/Contract';

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <Typography variant="h2" style={{ fontSize: '1.35rem', fontWeight: 600, color: '#ffffff', fontFamily: "'Inter', sans-serif", margin: 0 }}>
            Your Contracts
          </Typography>
          <span style={{ color: '#727080', cursor: 'pointer', fontSize: '1rem', display: 'inline-flex', alignItems: 'center' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="7" stroke="#727080" strokeWidth="1.5" />
              <path d="M8 7.5V11" stroke="#727080" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="#727080" />
            </svg>
          </span>
        </div>
        <div
          className="contracts-row contracts-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '50px 1fr 1fr 1fr 1fr 1fr',
            gap: '16px',
            alignItems: 'center',
            padding: '14px 16px',
            background: 'transparent',
            borderBottom: '1px solid #1f2130',
            marginBottom: '8px',
          }}
        >
          <div className="contract-check" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CheckBox checked={allSelected} onChange={onToggleAll} />
          </div>
          <div className="contracts-cell"><Typography style={{ color: '#a5a2b8', fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Name</Typography></div>
          <div className="contracts-cell"><Typography style={{ color: '#a5a2b8', fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Type</Typography></div>
          <div className="contracts-cell"><Typography style={{ color: '#a5a2b8', fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Per payment</Typography></div>
          <div className="contracts-cell"><Typography style={{ color: '#a5a2b8', fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Term length</Typography></div>
          <div className="contracts-cell"><Typography style={{ color: '#a5a2b8', fontWeight: 500, fontSize: '0.9rem', fontFamily: "'Inter', sans-serif" }}>Payment amount</Typography></div>
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
