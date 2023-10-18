import React from 'react';

import { screen } from '@testing-library/react';
import { axe } from 'react-day-picker/test/axe';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

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
