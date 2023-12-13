import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { ADD_CUSTOMER } from './components/customer-listings/constants';

describe('<App />', () => {
  test('renders App component', () => {
    const { getByText } = render(<App />);
    expect(getByText(ADD_CUSTOMER)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
