import React from 'react';

import {
  user,
  axe,
  gridcell,
  renderExampleApp,
  freezeTime
} from 'react-day-picker/test';

import Example from './custom-single';

const today = new Date(2021, 10, 25);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

describe('when a day is clicked', () => {
  beforeEach(async () => {
    await user.click(gridcell(today));
  });
  test('should appear as selected', () => {
    expect(gridcell(today)).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(app).toHaveTextContent('You selected Thu Nov 25 2021.');
  });
});
