import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Box from './Box';

// Smoke test
it('renders without crashing', () => {
  render(<Box id="1" width={100} height={100} backgroundColor="blue" removeBox={() => {}} />);
});

// Snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<Box id="1" width={100} height={100} backgroundColor="blue" removeBox={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

// Business logic test (removal functionality)
it('removes box when "X" button is clicked', () => {
  const mockRemove = jest.fn();
  const { getByText } = render(<Box id="1" width={100} height={100} backgroundColor="blue" removeBox={mockRemove} />);
  
  fireEvent.click(getByText("X"));
  
  expect(mockRemove).toHaveBeenCalledWith("1");
});
