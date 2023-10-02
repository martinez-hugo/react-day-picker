import React from 'react';

import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getDayButton, getTableFooter } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './custom-single';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when a day is clicked', () => {
  const day = new Date(2021, 10, 1);
  beforeEach(() => act(() => user.click(getDayButton(day))));
  test('should appear as selected', () => {
    expect(getDayButton(day)).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(getTableFooter()).toHaveTextContent('You selected Mon Nov 01 2021.');
  });
});
