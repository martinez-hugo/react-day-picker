import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './numbering-system';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should localize the year', () => {
  renderExampleApp(<Example />);
  expect(
    screen.getByRole('grid', { name: 'نوفمبر ٢٬٠٢١' })
  ).toBeInTheDocument();
});
test('should localize the days', () => {
  renderExampleApp(<Example />);
  expect(screen.getByText('أحد')).toBeInTheDocument();
});
test('should localize the week numbers', () => {
  renderExampleApp(<Example />);
  expect(screen.getByText('٤٥')).toBeInTheDocument();
});
