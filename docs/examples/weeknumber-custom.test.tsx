import React from 'react';

import { freezeTime, renderExampleApp, rowheader } from 'react-day-picker/test';

import Example from './weeknumber-custom';

const today = new Date(2022, 0, 1);

freezeTime(today);

test('should display the 53th week', () => {
  renderExampleApp(<Example />);
  expect(rowheader('Week 53')).toBeInTheDocument();
});
