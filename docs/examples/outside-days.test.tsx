import React from 'react';

import { screen } from '@testing-library/react';
import { axe } from 'react-day-picker/test/axe';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './outside-days';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when displaying a month with outside days', () => {
  test('should display the outside day', () => {
    renderExampleApp(<Example />);
    expect(screen.getByRole('gridcell', { name: '31' })).toBeInTheDocument();
  });
});
