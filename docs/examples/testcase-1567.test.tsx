import React from 'react';

import { screen } from '@testing-library/react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
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
