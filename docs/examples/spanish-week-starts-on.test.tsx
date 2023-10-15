import React from 'react';

import { grid } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './spanish-week-starts-on';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should have "Domingo" as first day of week', () => {
  renderExampleApp(<Example />);
  expect(grid()).toHaveAccessibleName('domingo');
});
