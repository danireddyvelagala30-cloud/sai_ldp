import axios from 'axios';
import { Contract } from '../types/Contract';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

export const getContracts = async (): Promise<Contract[]> => {
  const response = await api.get<Contract[]>(`/contracts?_t=${Date.now()}`);
  return response.data;
};
