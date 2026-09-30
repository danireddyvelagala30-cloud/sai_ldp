import { getContracts } from './api';

describe('API Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns fallback contracts when API call fails or encounters an error', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const result = await getContracts();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(6);
    warnSpy.mockRestore();
  });
});
