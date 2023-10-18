import React from 'react';

import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { gridcell } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { getFocusedElement } from 'react-day-picker/test/selectors';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './focus-recursive';

const today = new Date(2022, 5, 10);
freezeTime(today);

let app: HTMLElement;
beforeEach(async () => {
  app = renderExampleApp(<Example />).app;
  await user.tab();
  await user.tab();
  await user.tab();
  await user.type(getFocusedElement(), '{arrowdown}');
  await user.type(getFocusedElement(), '{arrowdown}');
  await user.type(getFocusedElement(), '{arrowdown}');
  await user.type(getFocusedElement(), '{arrowdown}');
});

test('the first selected day should have focus', () => {
  expect(gridcell(new Date(2022, 5, 22))).toHaveFocus();
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});
