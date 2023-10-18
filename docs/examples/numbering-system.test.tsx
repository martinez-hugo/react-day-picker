import React from 'react';

import { screen } from '@testing-library/react';
import { axe } from 'react-day-picker/test/axe';
import { grid } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './numbering-system';

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

test('should localize the year', () => {
  expect(grid('نوفمبر ٢٬٠٢١')).toBeInTheDocument();
});
test('should localize the days', () => {
  expect(screen.getByText('أحد')).toBeInTheDocument();
});
test('should localize the week numbers', () => {
  expect(screen.getByText('٤٥')).toBeInTheDocument();
});
