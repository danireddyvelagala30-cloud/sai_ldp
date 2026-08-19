import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContractsTable } from './index';
import { Contract } from '../../types/Contract';

const mockContracts: Contract[] = [
  { id: 1, name: 'Contract 1', type: 'Monthly', perPayment: 12000.25, term: '12 months', feeRate: 12, amount: 126000 },
  { id: 2, name: 'Contract 2', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 150000 },
];

describe('ContractsTable Organism', () => {
  test('renders table title and column headers', () => {
    render(
      <ContractsTable
        contracts={mockContracts}
        selectedIds={[]}
        allSelected={false}
        onToggleAll={() => {}}
        onToggleOne={() => {}}
      />
    );

    expect(screen.getByText('Your Contracts')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Per payment')).toBeInTheDocument();
    expect(screen.getByText('Term length')).toBeInTheDocument();
    expect(screen.getByText('Payment amount')).toBeInTheDocument();
  });

  test('renders all contract rows', () => {
    render(
      <ContractsTable
        contracts={mockContracts}
        selectedIds={[]}
        allSelected={false}
        onToggleAll={() => {}}
        onToggleOne={() => {}}
      />
    );

    expect(screen.getByText('Contract 1')).toBeInTheDocument();
    expect(screen.getByText('Contract 2')).toBeInTheDocument();
  });

  test('calls onToggleAll when header checkbox is clicked', () => {
    const handleToggleAll = jest.fn();
    render(
      <ContractsTable
        contracts={mockContracts}
        selectedIds={[]}
        allSelected={false}
        onToggleAll={handleToggleAll}
        onToggleOne={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const headerCheckbox = checkboxes[0];
    fireEvent.click(headerCheckbox);

    expect(handleToggleAll).toHaveBeenCalledTimes(1);
  });

  test('calls onToggleOne when row checkbox is clicked', () => {
    const handleToggleOne = jest.fn();
    render(
      <ContractsTable
        contracts={mockContracts}
        selectedIds={[1]}
        allSelected={false}
        onToggleAll={() => {}}
        onToggleOne={handleToggleOne}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    const firstRowCheckbox = checkboxes[1];
    fireEvent.click(firstRowCheckbox);

    expect(handleToggleOne).toHaveBeenCalledWith(1);
  });

  test('marks correct rows as selected based on selectedIds', () => {
    render(
      <ContractsTable
        contracts={mockContracts}
        selectedIds={[2]}
        allSelected={false}
        onToggleAll={() => {}}
        onToggleOne={() => {}}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });
});
