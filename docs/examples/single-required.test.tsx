import React from 'react';

import { act, render } from '@testing-library/react';

import { axe } from '../../test/axe';
import { getDayButton, getTableFooter } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './single-required';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);
let container: HTMLElement;
beforeEach(() => (container = render(<Example />).container));

test('should be accessible', async () => {
  expect(await axe(container)).toHaveNoViolations();
});

describe('when a day is clicked', () => {
  const day = new Date(2021, 10, 1);
  beforeEach(async () => act(() => user.click(getDayButton(day))));
  test('should appear as selected', () => {
    expect(getDayButton(day)).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent(
      'You selected November 1st, 2021.'
    );
  });
  describe('when the day is clicked again', () => {
    beforeEach(async () => act(() => user.click(getDayButton(day))));
    test('should appear as selected', () => {
      expect(getDayButton(day)).toHaveAttribute('aria-selected', 'true');
    });
  });
});
