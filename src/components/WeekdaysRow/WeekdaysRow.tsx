import { WeekdayColumnHeader as DefaultWeekdayColumnHeader } from '../WeekdayColumnHeader';
import { useDayPicker } from '../../contexts/DayPickerContext';

import { getWeekdays } from './utils/getWeekdays';

export function WeekdaysRow() {
  const {
    classNames,
    components,
    hideWeekdayRow,
    ISOWeek,
    locale,
    showWeekNumber,
    styles,
    weekStartsOn
  } = useDayPicker();

  const weekdays = getWeekdays(locale, weekStartsOn, ISOWeek);
  const WeekdayColumnHeader =
    components?.WeekdayColumnHeader ?? DefaultWeekdayColumnHeader;

  const classNamesList = [classNames.weekdays_row];
  if (hideWeekdayRow) {
    classNamesList.push(classNames.vhidden);
  }
  return (
    <div
      role="row"
      aria-rowindex={1}
      style={styles?.weekdays_row}
      className={classNamesList.join(' ')}
      onClick={(e) => e.stopPropagation()}
    >
      {showWeekNumber && <WeekdayColumnHeader aria-colindex={1} />}
      {weekdays.map((weekday, i) => (
        <WeekdayColumnHeader
          key={i}
          weekday={weekday}
          aria-colindex={showWeekNumber ? i + 2 : i + 1}
        />
      ))}
    </div>
  );
}
