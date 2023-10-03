import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './custom-single';

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

describe('when a day is clicked', () => {
  let gridcell: HTMLElement;
  beforeEach(async () => {
    gridcell = screen.getByRole('gridcell', { name: '1' });
    await user.click(gridcell);
  });
  test('should appear as selected', () => {
    expect(gridcell).toHaveAttribute('aria-selected', 'true');
  });
  test('should update the footer', () => {
    expect(app).toHaveTextContent('You selected Mon Nov 01 2021.');
  });
});
