import React from 'react';

import { screen } from '@testing-library/react';
import { axe, renderApp, freezeTime } from 'react-day-picker/test';

import Example from './custom-disable-row';

const today = new Date(2021, 10, 25);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('should have only 3 rows', () => {
  expect(screen.getAllByRole('row')).toHaveLength(3);
});
