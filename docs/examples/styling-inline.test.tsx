import React from 'react';

import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { getMonthCaption } from 'react-day-picker/test/selectors';
import { freezeTime } from 'react-day-picker/test/utils';

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
