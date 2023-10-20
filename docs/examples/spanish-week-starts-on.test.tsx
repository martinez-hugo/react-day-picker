import React from 'react';

import { columnheader, renderApp } from 'react-day-picker/test';

import Example from './spanish-week-starts-on';

test('should have "domingo" as first day of week', () => {
  renderApp(<Example />);
  expect(columnheader('domingo')).toBeInTheDocument();
});
