import React from 'react';

import { act, render, screen } from '@testing-library/react';
import { addDays, format } from 'date-fns';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getAllSelectedDays, getDayButton } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './useinput';

const today = new Date(2021, 10, 15);
freezeBeforeAll(today);

const yday = addDays(today, -1);
let container: HTMLElement;

function getInput(): HTMLInputElement {
  return screen.getByRole('textbox');
}
beforeEach(() => (container = render(<Example />).container));

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('today should be selected', () => {
  expect(getDayButton(today)).toHaveAttribute('aria-selected', 'true');
});

test('the input field should display today', () => {
  expect(getInput()).toHaveValue(format(today, 'PP'));
});

describe('when yesterday is clicked', () => {
  beforeEach(async () => act(() => user.click(getDayButton(yday))));
  test('the input field should display yesterday', () => {
    expect(getInput()).toHaveValue(format(yday, 'PP'));
  });
  describe('when today is typed in', () => {
    beforeEach(async () => {
      await act(() => user.clear(getInput()));
      await act(() => user.type(getInput(), format(today, 'PP')));
    });
    test('should be accessible', async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
    test('today should be selected', () => {
      expect(getDayButton(today)).toHaveAttribute('aria-selected', 'true');
    });
  });
  describe('when the input is cleared', () => {
    beforeEach(async () => act(() => user.clear(getInput())));
    test('no day should be selected', () => {
      expect(getAllSelectedDays()).toHaveLength(0);
    });
    test('should be accessible', async () => {
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
