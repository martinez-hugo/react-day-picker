import React from 'react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { getMonthCaption } from '../../test/selectors';
import { freezeBeforeAll } from '../../test/utils';
import Example from './styling-inline';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

beforeEach(() => {
  renderExampleApp(<Example />);
});

test('the caption should apply the custom style', () => {
  expect(getMonthCaption(0).parentElement).toHaveStyle({
    color: 'red'
  });
});
