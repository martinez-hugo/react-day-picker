import { es } from 'date-fns/locale';

import { MatchingModifiers } from '../types';

import { labelDay } from './labelDay';

const day = new Date(2022, 10, 21);
const modifiers: MatchingModifiers = {
  outside: false,
  disabled: false,
  selected: false,
  hidden: false,
  today: false,
  range_start: false,
  range_end: false,
  range_middle: false
};
test('should return the day label', () => {
  expect(labelDay(day, modifiers, { locale: es })).toEqual(
    '21º noviembre (lunes)'
  );
});
