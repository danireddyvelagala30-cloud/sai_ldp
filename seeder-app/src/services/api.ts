import axios from 'axios';
import { Contract } from '../types/Contract';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DEFAULT_CONTRACTS: Contract[] = [
  { id: 1, name: 'Contract 1', type: 'Monthly', perPayment: 12000.25, term: '12 months', feeRate: 12, amount: 126000 },
  { id: 6, name: 'Contract 6', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 140000 },
  { id: 5, name: 'Contract 5', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 150000 },
  { id: 4, name: 'Contract 4', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 160000 },
  { id: 3, name: 'Contract 3', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 154000 },
  { id: 2, name: 'Contract 2', type: 'Monthly', perPayment: 6000.00, term: '12 months', feeRate: 12, amount: 150000 },
];

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const getContracts = async (): Promise<Contract[]> => {
  try {
    const response = await api.get<Contract[]>(`/contracts?_t=${Date.now()}`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    }
    return DEFAULT_CONTRACTS;
  } catch (error) {
    console.warn('Backend API unavailable, using fallback contracts data:', error);
    return DEFAULT_CONTRACTS;
  }
};
