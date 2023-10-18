import React from 'react';

import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './custom-day';

freezeTime(new Date(2021, 10, 25));

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should render time elements', () => {
  const timeElements = app.getElementsByTagName('time');
  expect(timeElements).toHaveLength(35);
});
