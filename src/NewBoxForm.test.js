import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

// Smoke test
it('renders without crashing', () => {
  render(<NewBoxForm addBox={() => {}} />);
});

// Snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<NewBoxForm addBox={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

// Business logic test (form submission)
it('submits form and clears inputs', () => {
  const mockAddBox = jest.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm addBox={mockAddBox} />);

  fireEvent.change(getByLabelText("Width:"), { target: { value: "100" } });
  fireEvent.change(getByLabelText("Height:"), { target: { value: "100" } });
  fireEvent.change(getByLabelText("Background Color:"), { target: { value: "red" } });

  fireEvent.click(getByText("Add Box"));

  expect(mockAddBox).toHaveBeenCalledWith(expect.objectContaining({
    width: "100",
    height: "100",
    backgroundColor: "red"
  }));

  // Check that the form inputs are cleared
  expect(getByLabelText("Width:").value).toBe('');
  expect(getByLabelText("Height:").value).toBe('');
  expect(getByLabelText("Background Color:").value).toBe('');
});
