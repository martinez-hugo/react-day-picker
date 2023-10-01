import React from 'react';

import { screen } from '@testing-library/react';
import { Card, Cards } from 'nextra/components';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './controlled';

freezeBeforeAll(new Date(2022, 5, 10));

test('should not have AXE violations', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when the "Go to today" button is clicked', () => {
  const getTodayButton = () =>
    screen.getByRole('button', { name: 'Go to Today' });

  beforeEach(async () => {
    renderExampleApp(<Example />);
    await user.click(getTodayButton());
  });
  test('the button should be disabled', async () => {
    expect(getTodayButton()).toBeDisabled();
  });
  test('should display the current month', () => {
    expect(screen.getByRole('grid')).toHaveAccessibleName('June 2022');
  });
});
