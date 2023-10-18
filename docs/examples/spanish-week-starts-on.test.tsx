import React from 'react';

import { columnheader, renderExampleApp } from 'react-day-picker/test';

import Example from './spanish-week-starts-on';

test('should have "domingo" as first day of week', () => {
  renderExampleApp(<Example />);
  expect(columnheader('domingo')).toBeInTheDocument();
});
