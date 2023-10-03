import React from 'react';

import { differenceInMonths } from 'date-fns';

import { axe } from '../../test/axe';
import { po } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import Example from './from-to-month';

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('the previous button should be disabled', () => {
  expect(po.previousButton).toBeDisabled();
});

test('the next button should not be disabled', () => {
  expect(po.nextButton).not.toBeDisabled();
});

describe('when navigating to the last month', () => {
  const fromDate = new Date(2015, 5);
  const toDate = new Date(2015, 10);
  const nOfMonths = differenceInMonths(toDate, fromDate);
  beforeEach(async () => {
    for (let i = 0; i < nOfMonths; i++) {
      await user.click(po.nextButton);
    }
  });

  test('the previous button should not be disabled', () => {
    expect(po.previousButton).not.toBeDisabled();
  });

  test('the next button should be disabled', () => {
    expect(po.nextButton).toBeDisabled();
  });
});
