import { endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { DayPickerBaseProps } from 'DayPicker';

/** Return the `fromDate` and `toDate` prop values values parsing the DayPicker props. */
export function parseFromToProps(
  props: Pick<
    DayPickerBaseProps,
    | 'fromYear'
    | 'toYear'
    | 'fromDate'
    | 'toDate'
    | 'fromMonth'
    | 'toMonth'
    | 'today'
  >
): { fromDate: Date | undefined; toDate: Date | undefined } {
  const { fromYear, toYear, fromMonth, toMonth, today = new Date() } = props;
  let { fromDate, toDate } = props;

  if (fromMonth) {
    fromDate = startOfMonth(fromMonth);
  } else if (fromYear) {
    fromDate = new Date(fromYear, 0, 1);
  }
  if (toMonth) {
    toDate = endOfMonth(toMonth);
  } else if (toYear) {
    toDate = new Date(toYear, 11, 31);
  }

  return {
    fromDate: startOfDay(fromDate ?? today),
    toDate: toDate ? startOfDay(toDate) : undefined
  };
}
