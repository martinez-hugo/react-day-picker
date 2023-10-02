import React from 'react';

import { MonthCaption as DefaultMonthCaption } from 'components/MonthCaption';
import { WeekdaysRow as DefaultWeekdaysRow } from 'components/WeekdaysRow';
import { WeekRow as DefaultWeekRow } from 'components/WeekRow';
import { DayPickerMonth } from 'contexts/CalendarContext';
import { useDayPicker } from 'contexts/DayPickerContext';

export interface MonthGridProps
  extends Pick<React.AriaAttributes, 'aria-labelledby'> {
  /** The month where the grid is displayed. */
  month: DayPickerMonth;
  /** The index where this month is displayed. */
  displayIndex: number;
}

/**
 * Render the grid with the weekday header row and the weeks for the given month.
 */
export function MonthGrid(props: MonthGridProps) {
  const {
    id,
    mode,
    hideWeekdayRow,
    components,
    classNames,
    styles,
    labels: { labelGrid },
    locale
  } = useDayPicker();

  const reactId = React.useId();
  const captionId = id ? `${id}-caption` : reactId;

  const WeekdaysRow = components?.WeekdaysRow ?? DefaultWeekdaysRow;
  const MonthCaption = components?.MonthCaption ?? DefaultMonthCaption;
  const WeekRow = components?.WeekRow ?? DefaultWeekRow;

  return (
    <div
      className={classNames.month_grid_wrapper}
      style={styles?.month_grid_wrapper}
    >
      <MonthCaption id={captionId} month={props.month} />
      <div
        role="grid"
        aria-multiselectable={mode === 'multi' || mode === 'range'}
        aria-label={labelGrid(props.month.date, { locale })}
        className={classNames.month_grid}
        style={styles?.month_grid}
      >
        <WeekdaysRow />
        <div
          role="rowgroup"
          className={classNames.month_rowgroup}
          style={styles?.month_rowgroup}
        >
          {props.month.weeks.map((week, i) => (
            <WeekRow
              key={week.weekNumber}
              week={week}
              aria-rowindex={i + (hideWeekdayRow ? 1 : 2)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
