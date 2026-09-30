import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

jest.mock('./reportWebVitals', () => jest.fn());

describe('Index Entrypoint', () => {
  const originalGetElementById = document.getElementById;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.getElementById = originalGetElementById;
  });

  test('renders application into root div and calls reportWebVitals', () => {
    const rootDiv = document.createElement('div');
    rootDiv.id = 'root';
    document.body.appendChild(rootDiv);

    const mockRender = jest.fn();
    (ReactDOM.createRoot as jest.Mock).mockReturnValue({
      render: mockRender,
    });

    require('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalledWith(rootDiv);
    expect(mockRender).toHaveBeenCalled();
    expect(reportWebVitals).toHaveBeenCalled();

    document.body.removeChild(rootDiv);
  });
});
