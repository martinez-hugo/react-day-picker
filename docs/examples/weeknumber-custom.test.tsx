import { freezeTime, renderApp, rowheader } from '../../test';
import Example from './weeknumber-custom';

const today = new Date(2022, 0, 1);

freezeTime(today);

test('should display the 53th week', () => {
  renderApp(<Example />);
  expect(rowheader('Week 53')).toBeInTheDocument();
});
