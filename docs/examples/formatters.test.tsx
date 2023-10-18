import React from 'react';

import { screen } from '@testing-library/react';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './formatters';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should display the autumn emoji', () => {
  renderExampleApp(<Example />);
  expect(screen.getByRole('img', { name: 'autumn' })).toBeInTheDocument();
});
