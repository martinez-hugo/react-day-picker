import React from 'react';

import { DayPickerDay } from 'contexts/CalendarContext';
import { DayState } from 'types/modifiers';

export interface DayGridCellProps {
  day: DayPickerDay;
  state: DayState;
  htmlAttributes: React.HTMLAttributes<HTMLDivElement>;
  children?: React.ReactNode;
}

/** Render the gridcell with the Day. */
export function DayGridCell(props: DayGridCellProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, htmlAttributes } = props;
  return <div {...htmlAttributes}>{children}</div>;
}
