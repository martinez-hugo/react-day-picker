import { Calendar } from './components/Calendar';
import { ContextProviders } from './contexts/ContextProviders';
import { DayPickerBase } from './types/DayPickerBase';
import { DateRange } from './types/matchers';
import { Modifiers } from './types/modifiers';

export type Mode = 'range' | 'single' | 'multi';

export type Selected<T extends Mode | undefined> = T extends
  | 'single'
  | undefined
  ? Date | undefined
  : T extends 'multi'
  ? Date[] | undefined
  : T extends 'range'
  ? DateRange | undefined
  : never;

export type SelectedRequired<T extends Mode | undefined> = T extends
  | 'single'
  | undefined
  ? Date
  : T extends 'multi'
  ? Date[]
  : T extends 'range'
  ? DateRange
  : never;

export type SelectHandler<T extends Mode | undefined> = (
  /** The current selected value. */
  selected: Selected<T>,
  /** The date that triggered the event. */
  day: Date,
  /** The modifiers for `date`. */
  modifiers: Modifiers,
  e: React.MouseEvent
) => void;

export type SelectHandlerRequired<T extends Mode | undefined> = (
  /** The current selected value. */
  selected: SelectedRequired<T>,
  /** The date that triggered the event. */
  day: Date,
  /** The modifiers for `day`. */
  modifiers: Modifiers,
  e: React.MouseEvent
) => void;

export interface PropsMode<T extends Mode> extends DayPickerBase {
  mode: T;
  selected?: Selected<T>;
  onSelect?: SelectHandler<T>;
  required?: false;
}

export interface PropsModeRequired<T extends Mode> extends DayPickerBase {
  mode: T;
  selected: SelectedRequired<T>;
  onSelect?: SelectHandlerRequired<T>;
  required: true;
}

export interface PropsDefault extends Omit<PropsMode<'single'>, 'mode'> {
  mode?: undefined;
  required?: false;
}

export interface PropsDefaultRequired
  extends Omit<PropsModeRequired<'single'>, 'mode'> {
  mode?: undefined;
  required: true;
}

export type DayPickerProps<T extends Mode | undefined = undefined> =
  T extends Mode
    ? PropsMode<T> | PropsModeRequired<T>
    : PropsDefault | PropsDefaultRequired;

/**
 * Render a date picker component.
 * @see https://react-day-picker.js.org
 */
export function DayPicker<T extends Mode | undefined = undefined>(
  props: DayPickerProps<T>
): JSX.Element {
  return (
    <ContextProviders dayPickerProps={props}>
      <Calendar />
    </ContextProviders>
  );
}
