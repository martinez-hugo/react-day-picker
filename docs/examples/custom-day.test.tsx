import React from 'react';

import { renderExampleApp, freezeTime } from 'react-day-picker/test';

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
