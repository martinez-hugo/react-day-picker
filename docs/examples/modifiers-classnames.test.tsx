import React from 'react';

import { gridcell } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './modifiers-classnames';

const days = [
  new Date(2021, 5, 8),
  new Date(2021, 5, 9),
  new Date(2021, 5, 11)
];

const today = new Date(2021, 10, 25);
freezeTime(today);

beforeEach(() => {
  renderExampleApp(<Example />);
});

test.each(days)('the day %s should have the `my-booked-class` class', (day) => {
  expect(gridcell(day)).toHaveClass('my-booked-class');
});
