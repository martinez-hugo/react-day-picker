import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getMonthGrid } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './dropdown-multiple-months';

const today = new Date(2023, 9, 16);
freezeBeforeAll(today);

beforeEach(() => render(<Example />).container);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should display 5 year dropdowns', () => {
  expect(screen.getAllByRole('combobox', { name: 'Year:' })).toHaveLength(5);
});
test('should display 5 month dropdowns', () => {
  expect(screen.getAllByRole('combobox', { name: 'Month:' })).toHaveLength(5);
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
