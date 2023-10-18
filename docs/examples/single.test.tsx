import React from 'react';

import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { grid, gridcell } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './single';

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
  const day = new Date(2021, 10, 1);
  beforeEach(async () => {
    await user.click(gridcell(day));
  });
  test('should appear as selected', () => {
    expect(gridcell(day)).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(app).toHaveTextContent('You selected November 1st, 2021.');
  });
  describe('when the day is clicked again', () => {
    beforeEach(async () => {
      await user.click(gridcell(day));
    });
    test('should appear as not selected', () => {
      expect(gridcell(day)).not.toHaveAttribute('aria-selected');
    });
    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
  });
});
