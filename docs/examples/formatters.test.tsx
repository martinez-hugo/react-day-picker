import React from 'react';

import { screen } from '@testing-library/react';
import { renderApp, freezeTime } from 'react-day-picker/test';

import Example from './formatters';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should display the autumn emoji', () => {
  renderApp(<Example />);
  expect(screen.getByRole('img', { name: 'autumn' })).toBeInTheDocument();
});
