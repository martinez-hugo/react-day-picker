import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { nextButton, previousButton } from '../../test/po';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './rtl';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

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
