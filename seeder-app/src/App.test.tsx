import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

jest.mock('./services/api');

describe('App Root Component', () => {
  beforeEach(() => {
    (api.getContracts as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Contract 1', type: 'Monthly', perPayment: 12000.25, term: '12 months', feeRate: 12, amount: 126000 },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Cash Acceleration page by default', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /new cash kick/i })).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });
  });

  test('navigates between Home and Cash Acceleration pages', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });

    const homeNavBtn = screen.getByRole('button', { name: /home/i });
    fireEvent.click(homeNavBtn);

    expect(screen.getByRole('heading', { level: 1, name: /welcome to seeder/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: /new cash kick/i })).not.toBeInTheDocument();

    const cashNavBtn = screen.getByRole('button', { name: /cash acceleration/i });
    fireEvent.click(cashNavBtn);

    expect(screen.getByRole('heading', { level: 1, name: /new cash kick/i })).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Contract 1')).toBeInTheDocument();
    });
  });
});
