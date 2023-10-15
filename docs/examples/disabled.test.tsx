import { screen } from '@testing-library/react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import { user } from '../../test/user';
import { freezeBeforeAll } from '../../test/utils';
import Example from './disabled';

const today = new Date(2022, 5, 10);
freezeBeforeAll(today);

let app: HTMLElement;
let dayCell: HTMLElement;
beforeEach(async () => {
  app = renderExampleApp(<Example />).app;
  dayCell = screen.getByRole('gridcell', { name: '1' });
  return dayCell.focus();
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

test('should not display the previous button', () => {
  expect(
    screen.queryByRole('button', { name: 'Go to previous month' })
  ).not.toBeInTheDocument();
});

describe('when the first day is focused', () => {
  describe('when the Arrow Left is pressed', () => {
    beforeEach(async () => {
      await user.type(app, '{arrowleft}');
    });
    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
    test('should still display the same month', () => {
      expect(screen.getByRole('grid')).toHaveTextContent('June 2022');
    });
  });
});
describe('when the last day is focused', () => {
  describe('when the Arrow Right is pressed', () => {
    beforeEach(async () => {
      await user.type(app, '{arrowleft}');
    });

    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
    test('should still display the same month', () => {
      expect(screen.getByRole('grid')).toHaveTextContent('June 2022');
    });
  });
});
