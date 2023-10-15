import React from 'react';

import { screen } from '@testing-library/react';
import { addDays, format } from 'date-fns';

import { axe } from '../../test/axe';
import { gridcell } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getAllSelectedDays } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './useinput';

const today = new Date(2021, 10, 15);
freezeBeforeAll(today);

const yday = addDays(today, -1);

function getInput(): HTMLInputElement {
  return screen.getByRole('textbox');
}

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('today should be selected', () => {
  expect(gridcell(today)).toHaveAttribute('aria-selected', 'true');
});

test('the input field should display today', () => {
  expect(getInput()).toHaveValue(format(today, 'PP'));
});

describe('when yesterday is clicked', () => {
  beforeEach(async () => {
    await user.click(gridcell(yday));
  });
  test('the input field should display yesterday', () => {
    expect(getInput()).toHaveValue(format(yday, 'PP'));
  });
  describe('when today is typed in', () => {
    beforeEach(async () => {
      await user.clear(getInput());
      await user.type(getInput(), format(today, 'PP'));
    });
    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
    test('today should be selected', () => {
      expect(gridcell(today)).toHaveAttribute('aria-selected', 'true');
    });
  });
  describe('when the input is cleared', () => {
    beforeEach(async () => user.clear(getInput()));
    test('no day should be selected', () => {
      expect(getAllSelectedDays()).toHaveLength(0);
    });
    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
  });
});
