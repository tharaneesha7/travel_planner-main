import { render, screen } from '@testing-library/react';
import App from './App';

test('renders AC button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/AC/i);
  expect(buttonElement).toBeInTheDocument();
});