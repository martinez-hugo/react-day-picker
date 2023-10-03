import React from 'react';

import { differenceInMonths } from 'date-fns';

import { axe } from '../../test/axe';
import { po } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './from-to-year';

const fromDate = new Date(2024, 0);
const toDate = new Date(2026, 11);
const today = new Date(2025, 10, 25);
freezeBeforeAll(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('the previous month button should be disabled', () => {
  expect(po.previousButton).toBeDisabled();
});
test('the next month button should not be disabled', () => {
  expect(po.nextButton).not.toBeDisabled();
});

describe('when navigating to the last month', () => {
  const nOfMonths = differenceInMonths(toDate, fromDate);
  beforeEach(async () => {
    for (let i = 0; i < nOfMonths; i++) {
      await user.click(po.nextButton);
    }
  });
  test('should be accessible', async () => {
    expect(await axe(app)).toHaveNoViolations();
  });
  test('the previous month button should not be disabled', () => {
    expect(po.previousButton).not.toBeDisabled();
  });
  test('the next month button should be disabled', () => {
    expect(po.nextButton).toBeDisabled();
  });
});
