import { screen } from '@testing-library/react';
import { user, axe, renderApp, freezeTime, grid } from '../../test';

import Example from './controlled';

freezeTime(new Date(2022, 5, 10));

let app: HTMLElement;
beforeEach(() => {
  const render = renderApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

describe('when the "Go to today" button is clicked', () => {
  const todayButton = () => screen.getByRole('button', { name: 'Go to Today' });
  beforeEach(async () => {
    await user.click(todayButton());
  });
  test('the button should be disabled', async () => {
    expect(todayButton()).toBeDisabled();
  });
  test('should display the current month', () => {
    expect(grid()).toHaveAccessibleName('June 2022');
  });
});
