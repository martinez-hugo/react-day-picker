import React from 'react';

import { axe, renderApp } from '../../test';

import Example from './container-attributes';

let app: HTMLElement;
let dayPicker: HTMLElement;
beforeEach(() => {
  const render = renderApp(<Example />);
  app = render.app;
  dayPicker = render.dayPicker as HTMLElement;
});

test('should pass accessibility', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('should have the specified id', () => {
  expect(dayPicker).toHaveAttribute('id', 'testId');
});

test('should have the data set attribute', () => {
  expect(dayPicker).toHaveAttribute('data-test', 'testData');
});
