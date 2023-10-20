import { screen } from '@testing-library/react';

import { axe, freezeTime, renderApp } from '../../test';
import Example from './outside-days';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should be accessible', async () => {
  const { app } = renderApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

describe('when displaying a month with outside days', () => {
  test('should display the outside day', () => {
    renderApp(<Example />);
    expect(screen.getByRole('gridcell', { name: '31' })).toBeInTheDocument();
  });
});
