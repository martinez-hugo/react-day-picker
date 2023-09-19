import { startOfDay, startOfMonth } from 'date-fns';
import { DayPickerProps } from 'DayPicker';

import { getDates } from './utils/getDates';
import { getDayPickerMonths } from './utils/getDayPickerMonths';
import { getDisplayMonths } from './utils/getDisplayMonths';

export function getMonthsAndDates(
  firstMonth: Date,
  toDate?: Date | undefined,
  options?: Pick<
    DayPickerProps,
    'fixedWeeks' | 'ISOWeek' | 'locale' | 'numberOfMonths' | 'weekStartsOn'
  >
) {
  const { numberOfMonths = 1 } = options || {};
  const firstDayOfFirstMonth = startOfMonth(startOfDay(firstMonth));
  const displayMonths = getDisplayMonths(
    firstDayOfFirstMonth,
    numberOfMonths,
    toDate
  );
  const lastMonth = displayMonths[displayMonths.length - 1];
  const dates = getDates(firstDayOfFirstMonth, lastMonth, toDate, options);
  const months = getDayPickerMonths(displayMonths, dates, options);

  return { dates, months };
}
