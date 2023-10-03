import React from 'react';

import { DayGridCellProps, DayPicker } from 'react-day-picker';

function CustomDayGridCell(props: DayGridCellProps) {
  const isFirstDay =
    props.day.date.getDate() === 1 && props.state.outside === false;
  return (
    <time {...props.htmlAttributes}>
      {props.children}
      {isFirstDay && <div>(first day)</div>}
    </time>
  );
}

export default function Example() {
  return (
    <DayPicker
      today={new Date(2021, 10, 25)}
      components={{ DayGridCell: CustomDayGridCell }}
    />
  );
}
