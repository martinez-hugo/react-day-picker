import React from 'react';

import { act, render } from '@testing-library/react';

import { axe } from '../../test/axe';
import { getDayButton, getFocusedElement } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './focus-recursive';

const today = new Date(2022, 5, 10);
freezeBeforeAll(today);

let container: HTMLElement;

beforeEach(async () => {
  container = render(<Example />).container;
  await act(() => user.tab());
  await act(() => user.tab());
  await act(() => user.tab());
  await act(() => user.type(getFocusedElement(), '{arrowdown}'));
  await act(() => user.type(getFocusedElement(), '{arrowdown}'));
  await act(() => user.type(getFocusedElement(), '{arrowdown}'));
  await act(() => user.type(getFocusedElement(), '{arrowdown}'));
});

test('the first selected day should have focus', () => {
  expect(getDayButton(new Date(2022, 5, 22))).toHaveFocus();
});

test('should be accessible', async () => {
  expect(await axe(container)).toHaveNoViolations();
});
