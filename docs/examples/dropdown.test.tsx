import React from 'react';

import { act, render } from '@testing-library/react';
import { user, axe, renderExampleApp, freezeTime } from 'react-day-picker/test';
import {
  getMonthDropdown,
  getMonthGrid,
  getYearDropdown
} from 'react-day-picker/test/selectors';

import Example from './dropdown';

const today = new Date(2022, 5, 10);
freezeTime(today);

beforeEach(() => render(<Example />).container);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should display the year dropdown', () => {
  expect(getYearDropdown()).toBeInTheDocument();
});
test('should display the month dropdown', () => {
  expect(getMonthDropdown()).toBeInTheDocument();
});

describe('when choosing a month', () => {
  const monthName = 'January';
  beforeEach(() =>
    act(() => user.selectOptions(getMonthDropdown(), monthName))
  );
  test('should display the month', () => {
    expect(getMonthGrid()).toHaveAccessibleName(`${monthName} 2022`);
  });
});
