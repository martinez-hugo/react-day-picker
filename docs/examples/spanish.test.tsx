import React from 'react';

import { axe, renderExampleApp, freezeTime, grid } from 'react-day-picker/test';

import Example from './spanish';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should localize the caption in Spanish', () => {
  renderExampleApp(<Example />);
  expect(grid()).toHaveAccessibleName('noviembre 2021');
});
