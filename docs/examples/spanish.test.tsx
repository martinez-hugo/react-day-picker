import { axe, freezeTime, grid, renderApp } from '../../test';
import Example from './spanish';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should be accessible', async () => {
  const { app } = renderApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should localize the caption in Spanish', () => {
  renderApp(<Example />);
  expect(grid()).toHaveAccessibleName('noviembre 2021');
});
