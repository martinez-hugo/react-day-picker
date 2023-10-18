import React from 'react';

import { screen } from '@testing-library/react';
import { user } from 'react-day-picker/test';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';

import Example from './testcase-1567';

beforeEach(async () => {
  renderExampleApp(<Example />);
  await user.tab();
  await user.tab();
  await user.tab();
  await user.tab();
});

test('the button should have focus', () => {
  expect(
    screen.getByRole('button', { name: 'I should be focusable' })
  ).toHaveFocus();
});
