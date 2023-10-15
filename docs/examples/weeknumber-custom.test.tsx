import React from 'react';

import { screen } from '@testing-library/react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './weeknumber-custom';

const today = new Date(2022, 0, 1);
freezeBeforeAll(today);

test('should display the 53th week', () => {
  renderExampleApp(<Example />);
  const week53 = screen.getByRole('row', {
    name: /^W53/
  });
  expect(week53).toBeInTheDocument();
});
