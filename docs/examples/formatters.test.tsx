import React from 'react';

import { screen } from '@testing-library/react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './formatters';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should display the autumn emoji', () => {
  renderExampleApp(<Example />);
  expect(screen.getByRole('img', { name: 'autumn' })).toBeInTheDocument();
});
