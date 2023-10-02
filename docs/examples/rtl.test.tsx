import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './rtl';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should have the rtl dir attribute', () => {
  const { app } = renderExampleApp(<Example />);
  expect(app.firstChild).toHaveAttribute('dir', 'rtl');
});

describe('when clicking the next month button', () => {
  test('should display the next month', async () => {
    renderExampleApp(<Example />);
    await user.click(screen.getByRole('button', { name: 'Go to next month' }));
    expect(screen.getByRole('grid')).toHaveAccessibleName('ديسمبر 2021');
  });
});

describe('when clicking the previous month button', () => {
  test('should display the previous month', async () => {
    renderExampleApp(<Example />);
    await user.click(
      screen.getByRole('button', { name: 'Go to previous month' })
    );
    expect(screen.getByRole('grid')).toHaveAccessibleName('أكتوبر 2021');
  });
});
