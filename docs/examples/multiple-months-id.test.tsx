import React from 'react';

import { screen } from '@testing-library/react';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './multiple-months-id';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('the table ids should include the display index', () => {
  renderExampleApp(<Example />);
  const tableId1 = screen
    .getByRole('grid', { name: 'November 2021' })
    .getAttribute('id');
  const tableId2 = screen
    .getByRole('grid', { name: 'December 2021' })
    .getAttribute('id');
  expect(tableId1).toEqual('calendar_example-grid-0');
  expect(tableId2).toEqual('calendar_example-grid-1');
});
