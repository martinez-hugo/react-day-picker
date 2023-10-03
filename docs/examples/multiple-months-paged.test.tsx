import React from 'react';

import { act, render, screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './multiple-months-paged';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

beforeEach(() => render(<Example />).container);

test('should be accessible', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when rendering November 2021', () => {
  test('should render 2 grids', () => {
    expect(screen.getAllByRole('grid')).toHaveLength(2);
  });
  test('the first grid should be November', () => {
    const grids = screen.getAllByRole('grid');
    expect(grids[0]).toHaveAccessibleName('November 2021');
  });
  test('the second grid should be December', () => {
    expect(screen.getAllByRole('grid')[1]).toHaveAccessibleName(
      'December 2021'
    );
  });
  // Test pagination
  describe('when the previous month button is clicked', () => {
    beforeEach(async () => act(() => user.click(previousButton)));
    test('the first month should be October', () => {
      const grids = screen.getAllByRole('grid');
      expect(grids[0]).toHaveAccessibleName('September 2021');
    });
    test('the month caption should be November', () => {
      const grids = screen.getAllByRole('grid');
      expect(grids[1]).toHaveAccessibleName('October 2021');
    });
  });
});
