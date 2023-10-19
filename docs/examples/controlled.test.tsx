import React from 'react';

import { screen } from '@testing-library/react';
import {
  user,
  axe,
  renderExampleApp,
  freezeTime,
  grid
} from 'react-day-picker/test';

import Example from './controlled';

freezeTime(new Date(2022, 5, 10));

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
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
