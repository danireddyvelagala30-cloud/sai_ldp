import reportWebVitals from './reportWebVitals';

describe('reportWebVitals', () => {
  test('handles undefined callback without error', () => {
    expect(() => reportWebVitals()).not.toThrow();
  });

  test('handles function callback safely', () => {
    const callback = jest.fn();
    expect(() => reportWebVitals(callback)).not.toThrow();
  });
});
