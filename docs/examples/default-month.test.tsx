import React from 'react';

import { grid, renderExampleApp, freezeTime } from 'react-day-picker/test';

import Example from './default-month';

const today = new Date(2022, 5, 10);
freezeTime(today);

test('should display September 1979', () => {
  renderExampleApp(<Example />);
  expect(grid('September 1979')).toBeInTheDocument();
});
