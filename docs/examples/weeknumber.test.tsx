import React from 'react';

import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './weeknumber';

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

describe('when displaying November 2021', () => {
  test('should display the 45th week number', () => {
    const weekRow = screen.getByRole('rowheader', { name: 'Week 45' });
    expect(weekRow).toBeInTheDocument();
  });
  describe('when the week button is clicked', () => {
    beforeEach(async () => {
      await user.click(screen.getByRole('rowheader', { name: 'Week 45' }));
    });
    test('should update the footer', () => {
      expect(app).toHaveTextContent('You clicked the week n. 45.');
    });
  });
});
