import React from 'react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './custom-day';

freezeBeforeAll(new Date(2021, 10, 25));

test('should render time elements', () => {
  const { app } = renderExampleApp(<Example />);
  const timeElements = app.getElementsByTagName('time');
  expect(timeElements).toHaveLength(35);
});
