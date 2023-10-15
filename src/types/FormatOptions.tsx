import { Locale } from 'date-fns';

/** Options to format labels or dates.  */

export type FormatOptions = {
  locale?: Locale | undefined;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;
  firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | undefined;
  useAdditionalWeekYearTokens?: boolean | undefined;
  useAdditionalDayOfYearTokens?: boolean | undefined;
};
