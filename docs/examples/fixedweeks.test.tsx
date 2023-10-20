import React from 'react';

import { screen } from '@testing-library/react';
import { axe, renderApp, freezeTime } from '../../test';

import Example from './fixedweeks';

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

test('should render 7 rows', () => {
  expect(screen.getAllByRole('row')).toHaveLength(7);
});
