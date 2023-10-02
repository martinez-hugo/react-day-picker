import React from 'react';

import { render, screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './spanish';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should localize the caption in Spanish', () => {
  renderExampleApp(<Example />);
  expect(screen.getByRole('grid')).toHaveAccessibleName('noviembre 2021');
});
