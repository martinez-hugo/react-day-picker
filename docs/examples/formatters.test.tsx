import { screen } from '@testing-library/react';

import { freezeTime, renderApp } from '../../test';
import Example from './formatters';

const today = new Date(2021, 10, 25);
freezeTime(today);

test('should display the autumn emoji', () => {
  renderApp(<Example />);
  expect(screen.getByRole('img', { name: 'autumn' })).toBeInTheDocument();
});
