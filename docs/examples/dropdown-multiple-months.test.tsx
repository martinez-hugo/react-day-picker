import React from 'react';

import { act, screen } from '@testing-library/react';
import { user, axe, renderApp, freezeTime } from 'react-day-picker/test';
import { getMonthGrid } from 'react-day-picker/test/selectors';

import Example from './dropdown-multiple-months';

const today = new Date(2023, 9, 16);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

describe('when choosing a month from the first drop-down', () => {
  const newMonthName = 'January';
  beforeEach(() => {
    const firstDropDown = screen.getAllByRole('combobox', {
      name: 'Month:'
    })[0];
    return act(() => user.selectOptions(firstDropDown, newMonthName));
  });
  test('should display the month in the first dropdown', () => {
    expect(getMonthGrid(0)).toHaveAccessibleName(`${newMonthName} 2023`);
  });
});

describe('when choosing a month from the third drop-down', () => {
  const newMonthName = 'October';
  beforeEach(() => {
    const thirdDropDown = screen.getAllByRole('combobox', {
      name: 'Month:'
    })[2];
    return act(() => user.selectOptions(thirdDropDown, newMonthName));
  });
  test('should display the month selected the third dropdown', () => {
    expect(getMonthGrid(2)).toHaveAccessibleName(`${newMonthName} 2023`);
  });
});
