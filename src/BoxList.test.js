import React from 'react';
import { render } from '@testing-library/react';
import BoxList from './BoxList';

// Smoke test
it('renders without crashing', () => {
  render(<BoxList />);
});

// Snapshot test
it('matches snapshot', () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});
