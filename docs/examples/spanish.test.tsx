import React from 'react';

import { render, screen } from '@testing-library/react';
import { axe } from 'react-day-picker/test/axe';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './spanish';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should localize the caption in Spanish', () => {
  renderExampleApp(<Example />);
  expect(screen.getByRole('grid')).toHaveAccessibleName('noviembre 2021');
});
