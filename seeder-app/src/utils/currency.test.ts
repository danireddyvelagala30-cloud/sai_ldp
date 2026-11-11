import { formatCurrency } from './currency';
import * as utils from './index';

describe('Currency Utils and Barrel Export', () => {
  test('formats numbers as USD currency strings', () => {
    expect(formatCurrency(12000.25)).toBe('$12,000.25');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(150000)).toBe('$150,000.00');
  });

  test('exports formatCurrency from utils index', () => {
    expect(utils.formatCurrency).toBeDefined();
    expect(typeof utils.formatCurrency).toBe('function');
  });
});
