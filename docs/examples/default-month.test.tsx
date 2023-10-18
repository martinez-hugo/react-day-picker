import React from 'react';

import { grid } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './default-month';

const today = new Date(2022, 5, 10);
freezeTime(today);

test('should display September 1979', () => {
  renderExampleApp(<Example />);
  expect(grid('September 1979')).toBeInTheDocument();
});
