import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NewCashKickPage } from './index';
import * as api from '../../services/api';
import { Contract } from '../../types/Contract';
import * as SummaryCardModule from '../../organisms/SummaryCard';

jest.mock('../../services/api');

const mockContracts: Contract[] = [
  { id: 1, name: 'Contract 1', type: 'Monthly', perPayment: 12000.25, term: '12 months', feeRate: 12, amount: 100000 },
  { id: 2, name: 'Contract 2', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 200000 },
];

describe('NewCashKickPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays loading state initially and renders contracts upon success', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);

    render(<NewCashKickPage />);

    expect(screen.getByText(/fetching contracts from backend server.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/fetching contracts from backend server.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Contract 1')).toBeInTheDocument();
    expect(screen.getByText('Contract 2')).toBeInTheDocument();
    expect(screen.getByText('Your Contracts')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  test('handles API error state with error message and allows retry', async () => {
    (api.getContracts as jest.Mock)
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(mockContracts);

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole('button', { name: /retry fetching contracts/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });
  });

  test('handles API error state with default fallback error message when error has no message property', async () => {
    (api.getContracts as jest.Mock).mockRejectedValueOnce({});

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load contracts from backend server/i)).toBeInTheDocument();
    });
  });

  test('handles empty contracts data using default max total fallback', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce([]);

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Summary')).toBeInTheDocument();
    });

    expect(screen.getByText('$880,000.00')).toBeInTheDocument();
  });

  test('handles toggle all contracts', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const headerCheckbox = screen.getAllByRole('checkbox')[0];
    
    fireEvent.click(headerCheckbox);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(headerCheckbox);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('handles individual contract toggle', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const firstContractCheckbox = screen.getAllByRole('checkbox')[1];
    fireEvent.click(firstContractCheckbox);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('$100,000.00').length).toBeGreaterThanOrEqual(1);

    fireEvent.click(firstContractCheckbox);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('handles slider change to autoselect contracts and reset button', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const slider = screen.getByRole('slider');
    
    fireEvent.change(slider, { target: { value: '100000' } });
    expect(screen.getByText('1')).toBeInTheDocument();

    
    fireEvent.change(slider, { target: { value: '0' } });
    expect(screen.getByText('0')).toBeInTheDocument();

    fireEvent.change(slider, { target: { value: '300000' } });
    expect(screen.getByText('2')).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetBtn);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('submits cash kick when review button is clicked with selected contracts', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const headerCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(headerCheckbox);

    const submitBtn = screen.getByRole('button', { name: /review your credit/i });
    fireEvent.click(submitBtn);

    expect(alertMock).toHaveBeenCalledWith('Successfully submitted Cash Kick for 2 contract(s)!');
    alertMock.mockRestore();
  });

  test('alerts warning when handleSubmit is triggered with 0 selected contracts', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    let capturedSubmit: (() => void) | undefined;
    jest.spyOn(SummaryCardModule, 'SummaryCard').mockImplementation((props) => {
      capturedSubmit = props.onSubmit;
      return <div data-testid="mock-summary-card">Mock Summary Card</div>;
    });

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-summary-card')).toBeInTheDocument();
    });

    if (capturedSubmit) {
      capturedSubmit();
    }

    expect(alertMock).toHaveBeenCalledWith('Please select at least one contract to initiate a cash kick.');
    alertMock.mockRestore();
    jest.restoreAllMocks();
  });

  test('triggers window.history.back when back button is clicked in header', async () => {
    (api.getContracts as jest.Mock).mockResolvedValueOnce(mockContracts);
    const backSpy = jest.spyOn(window.history, 'back').mockImplementation(() => {});

    render(<NewCashKickPage />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const backBtn = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backBtn);

    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});
