import React from 'react';

import { screen } from '@testing-library/react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './default-month';

const today = new Date(2022, 5, 10);
freezeBeforeAll(today);

test('should display September 1979', () => {
  renderExampleApp(<Example />);
  expect(
    screen.getByRole('grid', { name: 'September 1979' })
  ).toBeInTheDocument();
});
