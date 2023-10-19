import React from 'react';

import { screen } from '@testing-library/react';
import { axe, renderExampleApp, freezeTime } from 'react-day-picker/test';

import Example from './fixedweeks';

const today = new Date(2021, 10, 25);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('should render 7 rows', () => {
  expect(screen.getAllByRole('row')).toHaveLength(7);
});
