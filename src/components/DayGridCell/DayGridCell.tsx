import { DayPickerDay } from '../../contexts/CalendarContext';
import { MatchingModifiers } from '../../types/modifiers';

export interface DayGridCellProps extends React.PropsWithChildren {
  day: DayPickerDay;
  state: MatchingModifiers;
  htmlAttributes: React.HTMLAttributes<HTMLElement>;
}

/** Render the gridcell with the Day. */
export function DayGridCell(props: DayGridCellProps): JSX.Element {
  const { children, htmlAttributes } = props;
  return <div {...htmlAttributes}>{children}</div>;
}
