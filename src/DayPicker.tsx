import * as components from './components';
import { Calendar } from './components/Calendar';
import { CaptionLayout } from './components/Nav';
import { ContextProviders } from './contexts/ContextProviders';
import {
  DayFocusEventHandler,
  DayKeyboardEventHandler,
  DayMouseEventHandler,
  DayPointerEventHandler,
  DaySelectEventHandler,
  DayTouchEventHandler,
  MonthChangeEventHandler,
  WeekNumberClickEventHandler
} from './types/events';
import { FormatOptions } from './types/FormatOptions';
import { Formatters } from './types/formatters';
import { Labels } from './types/labels';
import { DateRange, Matcher } from './types/matchers';
import {
  CustomModifier,
  ModifiersClassNames,
  ModifiersStyles
} from './types/modifiers';
import { ClassNames, Styles } from './types/styles';

export type CustomComponents = {
  [key in keyof typeof components]?: (typeof components)[key];
};

/** The name of a color in our color palette. */
export type DaysSelectionMode = 'range' | 'single' | 'multi';

/** The name of the color schemes. */
export type DayPickerColorScheme = 'auto' | 'dark' | 'light';

/** The name of the contrast preferences. */
export type DayPickerContrastPreference = 'no-preference' | 'less' | 'more';

export type DayPickerSelectedValue<TMode extends DaysSelectionMode | unknown> =
  [TMode] extends ['single']
    ? Date | undefined
    : [TMode] extends ['multi']
    ? Array<Date>
    : [TMode] extends ['range']
    ? DateRange
    : never;

/**
 * The {@link DayPicker} component props shared with all the selection modes.
 */
export interface DayPickerBaseProps {
  /**
   * The CSS class to add to the container element. To change the name of the
   * class instead, use `classNames.root`.
   */
  className?: string;
  /**
   * Change the class names of the HTML elements.
   *
   * Use this prop when you need to change the default class names — for example
   * when using CSS modules.
   */
  classNames?: Partial<ClassNames>;
  /**
   * Change the class name for the day matching the {@link modifiers}.
   */
  modifiersClassNames?: ModifiersClassNames;

  /**
   * Style to apply to the container element.
   */
  style?: React.CSSProperties;
  /**
   * Change the inline styles of the HTML elements.
   */
  styles?: Styles;
  /**
   * Change the inline style for the day matching the {@link modifiers}.
   */
  modifiersStyles?: ModifiersStyles;

  colorScheme?: DayPickerColorScheme;
  contrastPreference?: DayPickerContrastPreference;

  /**
   * A unique id to replace the random generated ids – used by DayPicker for
   * accessibility.
   */
  id?: string;

  mode?: DaysSelectionMode | undefined;

  /**
   * The initial month to show in the calendar. Use this prop to let DayPicker
   * control the current month. If you need to set the month programmatically,
   * use {@link month} and {@link onMonthChange}.
   *
   * @defaultValue The current month
   */
  defaultMonth?: Date;
  /**
   * The month displayed in the calendar.
   *
   * As opposed to {@link DayPickerBase.defaultMonth}, use this prop with
   * {@link DayPickerBase.onMonthChange} to change the month programmatically.
   */
  month?: Date;
  /**
   * Event fired when the user navigates between months.
   */
  onMonthChange?: MonthChangeEventHandler;
  /**
   * The number of displayed months.
   *
   * @defaultValue 1
   */
  numberOfMonths?: number;
  /**
   * The earliest day to start the month navigation.
   */
  fromDate?: Date;
  /**
   * The latest day to end the month navigation.
   */
  toDate?: Date;
  /**
   * The earliest month to start the month navigation.
   */
  fromMonth?: Date;
  /**
   * The latest month to end the month navigation.
   */
  toMonth?: Date;
  /**
   * The earliest year to start the month navigation.
   */
  fromYear?: number;
  /**
   * The latest year to end the month navigation.
   */
  toYear?: number;
  /**
   * Disable the navigation between months.
   *
   * @defaultValue false
   */
  disableNavigation?: boolean;
  /**
   * Paginate the month navigation displaying the {@link numberOfMonths} at
   * time.
   *
   * @defaultValue false
   */
  pagedNavigation?: boolean;
  /**
   * Render the months in reversed order (when {@link numberOfMonths} is greater
   * than `1`) to display the most recent month first.
   *
   * @defaultValue false
   */
  reverseMonths?: boolean;

  /**
   * Change the layout of the caption:
   *
   * - `buttons`: display prev/right buttons
   * - `dropdown`: display drop-downs to change the month and the year
   *
   * **Note:** the `dropdown` layout is available only when `fromDate`,
   * `fromMonth` or`fromYear` and `toDate`, `toMonth` or `toYear` are set.
   *
   * @defaultValue buttons
   */
  captionLayout?: CaptionLayout;
  /**
   * Display six weeks per months, regardless the month’s number of weeks.
   *
   * @defaultValue false
   */
  fixedWeeks?: boolean;
  /**
   * Hide the row displaying the weekday row header.
   *
   * @defaultValue false
   */
  hideWeekdayRow?: boolean;
  /**
   * Show the outside days (days falling in the next or the previous month).
   *
   * @defaultValue false
   */
  showOutsideDays?: boolean;
  /**
   * Show the week numbers column. Weeks are numbered according to the local
   * week index.
   *
   * - to use ISO week numbering, use the {@link ISOWeek} prop.
   * - to change how the week numbers are displayed, use the {@link Formatters} prop.
   *
   * @see {@link ISOWeek}, {@link weekStartsOn} and {@link firstWeekContainsDate}.
   *
   * @defaultValue false
   */
  showWeekNumber?: boolean;

  /**
   * The date-fns locale object used to localize dates.
   *
   * @defaultValue en-US
   * @see https://date-fns.org/docs/Locale
   */
  locale?: FormatOptions['locale'];
  /**
   * The index of the first day of the week (0 - Sunday). Overrides the locale's one.
   *
   * @see {@link ISOWeek}.
   */
  weekStartsOn?: FormatOptions['weekStartsOn'];
  /**
   * The day of January, which is always in the first week of the year.
   *
   * @see {@link ISOWeek}.
   * @see https://date-fns.org/docs/getWeek
   * @see https://en.wikipedia.org/wiki/Week#Numbering
   */
  firstWeekContainsDate?: FormatOptions['firstWeekContainsDate'];
  /**
   * Enable `DD` and `DDDD` for week year tokens when formatting or parsing dates.
   *
   * @see https://date-fns.org/docs/Unicode-Tokens
   */
  useAdditionalWeekYearTokens?: FormatOptions['useAdditionalWeekYearTokens'];
  /**
   * Enable `YY` and `YYYY` for day of year tokens when formatting or parsing dates.
   *
   * @see https://date-fns.org/docs/Unicode-Tokens
   */
  useAdditionalDayOfYearTokens?: FormatOptions['useAdditionalDayOfYearTokens'];

  /**
   * Use ISO week dates instead of the locale setting. Setting this prop will
   * ignore {@link weekStartsOn} and {@link firstWeekContainsDate}.
   *
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  ISOWeek?: boolean;

  /**
   * Change the components used for rendering the calendar elements.
   */
  components?: CustomComponents;

  /**
   * Content to add to the table footer element.
   */
  footer?: React.ReactNode;

  /**
   * When a selection mode is set, DayPicker will focus the first selected day
   * (if set) or the today's date (if not disabled).
   *
   * Use this prop when you need to focus DayPicker after a user actions, for
   * improved accessibility.
   */
  initialFocus?: boolean;

  /**
   * Apply the `disabled` modifier to the matching days.
   */
  disabled?: Matcher | Matcher[] | undefined;
  /**
   * Apply the `hidden` modifier to the matching days. Will hide them from the
   * calendar.
   */
  hidden?: Matcher | Matcher[] | undefined;

  /**
   * Apply the `selected` modifier to the matching days.
   */
  // selected?: Matcher | Matcher[] | undefined;

  /**
   * The today’s date. Default is the current date. This Date will get the
   * `today` modifier to style the day.
   */
  today?: Date;

  /**
   * Add modifiers to the matching days.
   */
  modifiers?: Record<CustomModifier, Matcher | Matcher[]> | undefined;

  /**
   * Labels creators to override the defaults. Use this prop to customize the
   * ARIA labels attributes.
   */
  labels?: Partial<Labels>;

  /**
   * The text direction of the calendar. Use `ltr` for left-to-right (default)
   * or `rtl` for right-to-left.
   */
  dir?: string;

  /**
   * A map of formatters. Use the formatters to override the default formatting
   * functions.
   */
  formatters?: Partial<Formatters>;

  onDayClick?: DayMouseEventHandler;
  onDayFocus?: DayFocusEventHandler;
  onDayBlur?: DayFocusEventHandler;
  onDayMouseEnter?: DayMouseEventHandler;
  onDayMouseLeave?: DayMouseEventHandler;
  onDayKeyDown?: DayKeyboardEventHandler;
  onDayKeyUp?: DayKeyboardEventHandler;
  onDayKeyPress?: DayKeyboardEventHandler;
  onDayPointerEnter?: DayPointerEventHandler;
  onDayPointerLeave?: DayPointerEventHandler;
  onDayTouchCancel?: DayTouchEventHandler;
  onDayTouchEnd?: DayTouchEventHandler;
  onDayTouchMove?: DayTouchEventHandler;
  onDayTouchStart?: DayTouchEventHandler;
  onNextClick?: MonthChangeEventHandler;
  onPrevClick?: MonthChangeEventHandler;
  onWeekNumberClick?: WeekNumberClickEventHandler;
}

/**
 * The props for the {@link DayPicker} component when `mode="single"`.
 */
export interface DayPickerSingleProps extends DayPickerBaseProps {
  mode?: 'single' | undefined;
  selected?: DayPickerSelectedValue<'single'> | undefined;
  onSelect?: DaySelectEventHandler<'single'>;
  /** Make the selection required. */
  required?: boolean;
}

/**
 * The props for the {@link DayPicker} component when `mode="multi"`.
 */
export interface DayPickerMultiProps extends DayPickerBaseProps {
  mode: 'multi';
  selected?: DayPickerSelectedValue<'multi'> | undefined;
  onSelect?: DaySelectEventHandler<'multi'>;
  /** The minimum amount of days that must be selected. */
  min?: number;
  /** The minimum amount of days that can be selected. */
  max?: number;
}

/**
 * The props for the {@link DayPicker} component when `mode="range"`.
 */
export interface DayPickerRangeProps extends DayPickerBaseProps {
  mode: 'range';
  selected?: DayPickerSelectedValue<'range'> | undefined;
  onSelect?: DaySelectEventHandler<'range'>;
  /** The minimum amount of days that must be selected.  */
  min?: number;
  /** The minimum amount of days that can be selected. */
  max?: number;
}

/**
 * The props for the {@link DayPicker} component.
 */
export type DayPickerProps =
  | DayPickerBaseProps
  | DayPickerSingleProps
  | DayPickerMultiProps
  | DayPickerRangeProps;
/**
 * DayPicker render a date picker component to let users pick dates from a
 * calendar. See http://react-day-picker.js.org for updated documentation and
 * examples.
 *
 * ### Customization
 *
 * DayPicker offers different customization props. For example,
 *
 * - show multi months using `numberOfMonths`
 * - display a dropdown to navigate the months via `captionLayout`
 * - display the week numbers with `showWeekNumber`
 * - disable or hide days with `disabled` or `hidden`
 *
 * ### Controlling the months
 *
 * Change the initially displayed month using the `defaultMonth` prop. The
 * displayed months are controlled by DayPicker and stored in its internal
 * state. To control the months yourself, use `month` instead of `defaultMonth`
 * and use the `onMonthChange` event to set it.
 *
 * To limit the months the user can navigate to, use
 * `fromDate`/`fromMonth`/`fromYear` or `toDate`/`toMonth`/`toYear`.
 *
 * ### Selection modes
 *
 * DayPicker supports different selection mode that can be toggled using the
 * `mode` prop:
 *
 * - `mode="single"`: only one day can be selected. Use `required` to make the
 *   selection required. Use the `onSelect` event handler to get the selected
 *   days.
 * - `mode="multi"`: users can select one or more days. Limit the amount of
 *   days that can be selected with the `min` or the `max` props.
 * - `mode="range"`: users can select a range of days. Limit the amount of days
 *   in the range with the `min` or the `max` props.
 * - `mode="default"` (default): the built-in selections are disabled. Implement
 *   your own selection mode with `onDayClick`.
 *
 * The selection modes should cover the most common use cases. In case you
 * need a more refined way of selecting days, use `mode="default"`. Use the
 * `selected` props and add the day event handlers to add/remove days from the
 * selection.
 *
 * ### Modifiers
 *
 * A _modifier_ represents different styles or states for the days displayed in
 * the calendar (like "selected" or "disabled"). Define custom modifiers using
 * the `modifiers` prop.
 *
 * ### Formatters and custom component
 *
 * You can customize how the content is displayed in the date picker by using
 * either the formatters or replacing the internal components.
 *
 * For the most common cases you want to use the `formatters` prop to change how
 * the content is formatted in the calendar. Use the `components` prop to
 * replace the internal components, like the navigation icons.
 *
 * ### Styling
 *
 * DayPicker comes with a default, basic style in `react-day-picker/style` – use
 * it as template for your own style.
 *
 * If you are using CSS modules, pass the imported styles object the
 * `classNames` props.
 *
 * You can also style the elements via inline styles using the `styles` prop.
 *
 * ### Form fields
 *
 * If you need to bind the date picker to a form field, you can use the
 * `useInput` hooks for a basic behavior. See the `useInput` source as an
 * example to bind the date picker with form fields.
 *
 * ### Localization
 *
 * To localize DayPicker, import the locale from `date-fns` package and use the
 * `locale` prop.
 *
 * For example, to use Spanish locale:
 *
 * ```
 * import { es } from 'date-fns/locale';
 * <DayPicker locale={es} />
 * ```
 */
export function DayPicker(props: DayPickerProps): JSX.Element {
  return (
    <ContextProviders dayPickerProps={props}>
      <Calendar />
    </ContextProviders>
  );
}
