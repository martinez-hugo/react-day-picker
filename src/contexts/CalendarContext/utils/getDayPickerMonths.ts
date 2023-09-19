import {
  addDays,
  endOfISOWeek,
  endOfMonth,
  endOfWeek,
  getWeek,
  startOfISOWeek,
  startOfWeek
} from 'date-fns';
import { DayPickerProps } from 'DayPicker';

import {
  DayPickerDay,
  DayPickerMonth,
  DayPickerWeek
} from 'contexts/CalendarContext/DayPickerCalendar';

/** Return the {@link DayPickerMonth | DayPickerMonths} to display in the calendar. */
export function getDayPickerMonths(
  months: Date[],
  dates: Date[],
  options?: Pick<
    DayPickerProps,
    | 'firstWeekContainsDate'
    | 'fixedWeeks'
    | 'ISOWeek'
    | 'locale'
    | 'reverseMonths'
    | 'weekStartsOn'
  >
) {
  const dayPickerMonths = months.reduce<DayPickerMonth[]>((months, month) => {
    const firstDateOfFirstWeek = options?.ISOWeek
      ? startOfISOWeek(month)
      : startOfWeek(month, options);
    const lastDateOfLastWeek = options?.ISOWeek
      ? endOfISOWeek(endOfMonth(month))
      : endOfWeek(endOfMonth(month), options);

    const monthDates = dates.filter((date) => {
      return date >= firstDateOfFirstWeek && date <= lastDateOfLastWeek;
    });

    if (options?.fixedWeeks && monthDates.length < 42) {
      const extraDates = dates.filter((date) => {
        return (
          date > lastDateOfLastWeek && date <= addDays(lastDateOfLastWeek, 7)
        );
      });
      monthDates.push(...extraDates);
    }

    const dayPickerWeeks = monthDates.reduce<DayPickerWeek[]>((weeks, date) => {
      const weekNumber = getWeek(date, options);
      const week = weeks.find((week) => week.weekNumber === weekNumber);

      const day = new DayPickerDay(date, month);
      if (!week) {
        weeks.push(new DayPickerWeek(weekNumber, [day]));
      } else {
        week.days.push(day);
      }
      return weeks;
    }, []);

    const dayPickerMonth = new DayPickerMonth(month, dayPickerWeeks);

    months.push(dayPickerMonth);
    return months;
  }, []);
  if (options?.reverseMonths) dayPickerMonths.reverse();

  return dayPickerMonths;
}
