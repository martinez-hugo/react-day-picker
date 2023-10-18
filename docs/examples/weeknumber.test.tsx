import React from 'react';

import { screen } from '@testing-library/react';
import { rowheader, user } from 'react-day-picker/test';
import { axe } from 'react-day-picker/test/axe';
import { renderExampleApp } from 'react-day-picker/test/renderExampleApp';
import { freezeTime } from 'react-day-picker/test/utils';

import Example from './weeknumber';

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
  test('should display the 45th week number', () => {
    expect(rowheader('Week 45')).toBeInTheDocument();
  });
  describe('when the week button is clicked', () => {
    beforeEach(async () => {
      await user.click(rowheader('Week 45'));
    });
    test('should update the footer', () => {
      expect(app).toHaveTextContent('You clicked the week n. 45.');
    });
  });
});
