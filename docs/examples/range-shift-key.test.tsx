import React from 'react';

import { user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { gridcell } from 'react-day-picker/test/po';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './range-shift-key';

const today = new Date(2021, 10, 25);
freezeTime(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('should be accessible', async () => {
  expect(await axe(app)).toHaveNoViolations();
});

describe('when displaying November 2021', () => {
  describe('when clicking on the 11th', () => {
    const day1 = new Date(2021, 10, 11);
    beforeEach(async () => {
      await user.click(gridcell(day1));
    });
    test('the 11th day should have aria-selected true', () => {
      expect(gridcell(day1)).toHaveAttribute('aria-selected', 'true');
    });
    test('should be accessible', async () => {
      expect(await axe(app)).toHaveNoViolations();
    });
    describe('when clicking on the 13th', () => {
      const day2 = new Date(2021, 10, 13);
      beforeEach(async () => {
        await user.click(gridcell(day2));
      });
      test('the 11th day should still have aria-selected true', () => {
        expect(gridcell(day1)).toHaveAttribute('aria-selected', 'true');
      });
      test('the 13th day not should not have aria-selected', () => {
        expect(gridcell(day2)).not.toHaveAttribute('aria-selected');
      });
      test('should be accessible', async () => {
        expect(await axe(app)).toHaveNoViolations();
      });
    });
    describe('when pressing the Shift key', () => {
      const day2 = new Date(2021, 10, 13);
      beforeEach(async () => {
        user.keyboard('{Shift>}');
        await user.click(gridcell(day2));
      });
      test('the 13th day should have aria-selected true', () => {
        expect(gridcell(day2)).toHaveAttribute('aria-selected', 'true');
      });
      test('should be accessible', async () => {
        expect(await axe(app)).toHaveNoViolations();
      });
    });
  });
});
