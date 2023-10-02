import React from 'react';

import { act, render, screen } from '@testing-library/react';
import { differenceInMonths } from 'date-fns';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './from-to-year';

const fromDate = new Date(2015, 0);
const toDate = new Date(2018, 11);
const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

let container: HTMLElement;
beforeEach(() => (container = render(<Example />).container));

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('the previous month button should be disabled', () => {
  expect(
    screen.getByRole('button', { name: 'Go to previous month' })
  ).toBeDisabled();
});
test('the next month button should not be disabled', () => {
  expect(
    screen.getByRole('button', { name: 'Go to next month' })
  ).not.toBeDisabled();
});

describe('when navigating to the last month', () => {
  const nOfMonths = differenceInMonths(toDate, fromDate);
  beforeEach(async () => {
    for (let i = 0; i < nOfMonths; i++) {
      await act(() =>
        user.click(screen.getByRole('button', { name: 'Go to next month' }))
      );
    }
  });
  test('should be accessible', async () => {
    expect(await axe(container)).toHaveNoViolations();
  });
  test('the previous month button should not be disabled', () => {
    expect(
      screen.getByRole('button', { name: 'Go to previous month' })
    ).not.toBeDisabled();
  });
  test('the next month button should be disabled', () => {
    expect(
      screen.getByRole('button', { name: 'Go to next month' })
    ).toBeDisabled();
  });
});
