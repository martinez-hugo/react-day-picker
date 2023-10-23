/** A _modifier_ represents different styles or states of a day displayed in the calendar. */
export type CustomModifier = string;

/** The name of the modifiers that are used internally by DayPicker. */
export type InternalModifier =
  | 'outside'
  | 'disabled'
  | 'selected'
  | 'hidden'
  | 'today'
  | 'range_start'
  | 'range_end'
  | 'range_middle';

/**
 * The modifiers that are matching a day in the calendar. Use the {@link useActiveModifiers} hook to get the modifiers for a day.
 *
 * ```
 * const matchingModifiers: MatchingModifiers = {
 *  selected: true,
 *  customModifier: true
 * }
 * ```
 *
 * */
export type MatchingModifiers = Record<CustomModifier, boolean> &
  Record<InternalModifier, boolean>;

/** The style to apply to each day element matching a modifier. */
export type ModifiersStyles = Record<CustomModifier, React.CSSProperties> &
  Partial<Record<InternalModifier, React.CSSProperties>>;

/** The classnames to assign to each day element matching a modifier. */
export type ModifiersClassNames = Record<CustomModifier, string> &
  Partial<Record<InternalModifier, string>>;
