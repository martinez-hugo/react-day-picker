import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { getMonthGrid } from '../../test/selectors';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './multiple-months';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);
let container: HTMLElement;
beforeEach(() => (container = render(<Example />).container));

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should render 2 grids', () => {
  expect(screen.getAllByRole('grid')).toHaveLength(2);
});

test('the table ids should include the display index', () => {
  const tableId1 = getMonthGrid(0).getAttribute('id');
  const tableId2 = getMonthGrid(1).getAttribute('id');
  expect(tableId1).toEqual('example-grid-0');
  expect(tableId2).toEqual('example-grid-1');
});

test('the first grid should be November', () => {
  const grids = screen.getAllByRole('grid');
  expect(grids[0]).toHaveAccessibleName('November 2021');
});

test('the second grid should be December', () => {
  const grids = screen.getAllByRole('grid');
  expect(grids[1]).toHaveAccessibleName('December 2021');
});

// Test pagination
describe('when the previous month button is clicked', () => {
  beforeEach(async () =>
    act(() =>
      user.click(screen.getByRole('button', { name: 'Go to previous month' }))
    )
  );
  test('the first month should be October', () => {
    const grids = screen.getAllByRole('grid');
    expect(grids[0]).toHaveAccessibleName('October 2021');
  });

  test('the first month should be November', () => {
    const grids = screen.getAllByRole('grid');
    expect(grids[1]).toHaveAccessibleName('November 2021');
  });
  test('should be accessible', async () => {
    expect(await axe(container)).toHaveNoViolations();
  });
});
