import React from 'react';

import { screen } from '@testing-library/react';
import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { nextButton, previousButton } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './rtl';

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

test('should have the rtl dir attribute', () => {
  expect(app.firstChild).toHaveAttribute('dir', 'rtl');
});

describe('when clicking the next month button', () => {
  test('should display the next month', async () => {
    await user.click(nextButton());
    expect(screen.getByRole('grid')).toHaveAccessibleName('ديسمبر 2021');
  });
});

describe('when clicking the previous month button', () => {
  test('should display the previous month', async () => {
    await user.click(previousButton());
    expect(screen.getByRole('grid')).toHaveAccessibleName('أكتوبر 2021');
  });
});
