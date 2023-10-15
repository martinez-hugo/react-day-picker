import { format } from 'date-fns';

import { FormatOptions } from 'types/FormatOptions';
import { MatchingModifiers } from 'types/modifiers';

/** Return the default ARIA label for the day button. */
export function labelDay(
  day: Date,
  matchingModifiers: MatchingModifiers,
  options?: FormatOptions
) {
  return format(day, 'do MMMM (EEEE)', options);
}
