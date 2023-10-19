import React from 'react';

import { renderExampleApp, freezeTime } from 'react-day-picker/test';
import { getMonthCaption } from 'react-day-picker/test/selectors';

import Example from './styling-inline';

const today = new Date(2021, 10, 25);
freezeTime(today);

beforeEach(() => {
  renderExampleApp(<Example />);
});

test('the caption should apply the custom style', () => {
  expect(getMonthCaption(0).parentElement).toHaveStyle({
    color: 'red'
  });
});
