import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { grid } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './numbering-system';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

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
