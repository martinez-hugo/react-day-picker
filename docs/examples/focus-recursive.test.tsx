import { user, axe, gridcell, renderApp, freezeTime } from '../../test';
import { getFocusedElement } from 'react-day-picker/test/selectors';

import Example from './focus-recursive';

const today = new Date(2022, 5, 10);
freezeTime(today);

let app: HTMLElement;
beforeEach(async () => {
  app = renderApp(<Example />).app;
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
