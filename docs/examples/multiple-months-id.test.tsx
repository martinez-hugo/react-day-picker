import { screen } from '@testing-library/react';
import { renderApp, freezeTime } from '../../test';

import Example from './multiple-months-id';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('the table ids should include the display index', () => {
  renderApp(<Example />);
  const tableId1 = screen
    .getByRole('grid', { name: 'November 2021' })
    .getAttribute('id');
  const tableId2 = screen
    .getByRole('grid', { name: 'December 2021' })
    .getAttribute('id');
  expect(tableId1).toEqual('calendar_example-grid-0');
  expect(tableId2).toEqual('calendar_example-grid-1');
});
