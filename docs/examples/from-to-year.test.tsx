import React from 'react';

import { differenceInMonths } from 'date-fns';
import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { nextButton, previousButton } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './from-to-year';

const fromDate = new Date(2024, 0);
const toDate = new Date(2026, 11);
const today = new Date(2025, 10, 25);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('the previous month button should be disabled', () => {
  expect(previousButton()).toBeDisabled();
});
test('the next month button should not be disabled', () => {
  expect(nextButton()).not.toBeDisabled();
});

describe('when navigating to the last month', () => {
  const nOfMonths = differenceInMonths(toDate, fromDate);
  beforeEach(async () => {
    for (let i = 0; i < nOfMonths; i++) {
      await user.click(nextButton());
    }
  });
  test('should be accessible', async () => {
    expect(await axe(app)).toHaveNoViolations();
  });
  test('the previous month button should not be disabled', () => {
    expect(previousButton()).not.toBeDisabled();
  });
  test('the next month button should be disabled', () => {
    expect(nextButton()).toBeDisabled();
  });
});
