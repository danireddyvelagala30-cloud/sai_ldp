import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContractRow } from './index';
import { Contract } from '../../types/Contract';

const mockContract: Contract = {
  id: 1,
  name: 'Contract 1',
  type: 'Monthly',
  perPayment: 12000.25,
  term: '12 months',
  feeRate: 12,
  amount: 126000,
};

describe('ContractRow Molecule', () => {
  test('renders contract details correctly', () => {
    render(<ContractRow contract={mockContract} selected={false} onToggle={() => {}} />);

    expect(screen.getByText('Contract 1')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('$12,000.25')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('12.0% fee')).toBeInTheDocument();
    expect(screen.getByText('$126,000.00')).toBeInTheDocument();
  });

  test('falls back to 12.0% fee when feeRate is not specified or 0', () => {
    const contractWithoutFee: Contract = {
      ...mockContract,
      feeRate: 0,
    };
    render(<ContractRow contract={contractWithoutFee} selected={false} onToggle={() => {}} />);
    expect(screen.getByText('12.0% fee')).toBeInTheDocument();
  });

  test('reflects selected state with class and checked checkbox', () => {
    render(
      <ContractRow contract={mockContract} selected={true} onToggle={() => {}} />
    );

    const row = screen.getByTestId('contract-row');
    expect(row).toHaveClass('selected');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('reflects unselected state without selected class', () => {
    render(
      <ContractRow contract={mockContract} selected={false} onToggle={() => {}} />
    );

    const row = screen.getByTestId('contract-row');
    expect(row).not.toHaveClass('selected');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle with contract id when checkbox is clicked', () => {
    const handleToggle = jest.fn();
    render(<ContractRow contract={mockContract} selected={false} onToggle={handleToggle} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(mockContract.id);
  });
});
