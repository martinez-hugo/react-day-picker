import React from 'react';

import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { grid, gridcell } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './multiple';

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
  const day1 = new Date(2021, 10, 1);
  beforeEach(async () => {
    await user.click(gridcell(day1));
  });
  test('should appear as selected', () => {
    expect(gridcell(day1)).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(grid()).toHaveTextContent('You selected 1 day(s).');
  });
  describe('when a second day is clicked', () => {
    const day2 = new Date(2021, 10, 2);
    beforeEach(async () => {
      await user.click(gridcell(day2));
    });
    test('the first day should appear as selected', () => {
      expect(gridcell(day1)).toHaveAttribute('aria-selected', 'true');
    });
    test('the second day should appear as selected', () => {
      expect(gridcell(day2)).toHaveAttribute('aria-selected', 'true');
    });
    test('should update the footer', () => {
      expect(grid()).toHaveTextContent('You selected 2 day(s).');
    });
  });
});
