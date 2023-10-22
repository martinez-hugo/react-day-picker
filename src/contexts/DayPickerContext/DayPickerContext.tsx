import { Locale, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { createContext, ReactNode, useContext, useId } from 'react';
import { CaptionLayout } from '../../components/Nav';
import {
  CustomComponents,
  DayPickerBaseProps,
  DayPickerColorScheme,
  DayPickerContrastPreference,
  DayPickerMultiProps,
  DayPickerProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  DaysSelectionMode
} from '../../DayPicker';
import * as formatters from '../../formatters';
import * as labels from '../../labels';
import {
  ClassNames,
  CustomModifier,
  Formatters,
  Labels,
  Matcher,
  ModifiersClassNames,
  ModifiersStyles,
  Styles
} from '../../types';
import {
  DayFocusEventHandler,
  DayKeyboardEventHandler,
  DayMouseEventHandler,
  DayPointerEventHandler,
  DaySelectEventHandler,
  DayTouchEventHandler,
  MonthChangeEventHandler,
  WeekNumberClickEventHandler
} from '../../types/events';
import { defaultClassNames } from './defaultClassNames';
import { parseFromToProps } from './utils/parseFromToProps';

/** A record with `data-*` attributes passed to {@link DayPicker}. */
export type DataAttributes = Record<string, unknown>;

/**
 * The {@link DayPickerProps} with their default values. Use this type within
 * internal components to use safe props and avoid all conditionals.
 */
export interface DayPickerContext<TMode extends DaysSelectionMode | unknown> {
  mode: TMode;

  captionLayout: CaptionLayout;
  className: string | undefined;
  classNames: Required<ClassNames>;
  colorScheme: DayPickerColorScheme;
  contrastPreference: DayPickerContrastPreference;
  components: Partial<CustomComponents> | undefined;
  dataAttributes: DataAttributes;
  defaultMonth: Date | undefined;
  dir: string | undefined;
  disabled?: DayPickerBaseProps['disabled'];
  disableNavigation: boolean;
  firstWeekContainsDate: DayPickerBaseProps['firstWeekContainsDate'];
  fixedWeeks: boolean;
  footer: React.ReactNode | undefined;
  formatters: Formatters;
  fromDate: Date | undefined;
  fromMonth: Date | undefined;
  fromYear: number | undefined;
  hidden?: DayPickerBaseProps['hidden'];
  hideWeekdayRow: boolean;
  id: string;
  initialFocus: boolean;
  ISOWeek: boolean;
  labels: Labels;
  locale: Locale;
  max: number | undefined;
  min: number | undefined;
  modifiers: Record<CustomModifier, Matcher | Matcher[]> | undefined;
  modifiersClassNames: ModifiersClassNames | undefined;
  modifiersStyles: Partial<ModifiersStyles> | undefined;
  month: Date | undefined;
  numberOfMonths: number;
  onMonthChange: MonthChangeEventHandler | undefined;
  pagedNavigation: boolean;
  required: boolean;
  reverseMonths: boolean;
  selected?: Matcher | Matcher[] | undefined;
  showOutsideDays: boolean;
  showWeekNumber: boolean;
  style: React.CSSProperties | undefined;
  styles: Partial<Styles> | undefined;
  toDate: Date | undefined;
  today: Date;
  toMonth: Date | undefined;
  toYear: number | undefined;
  weekStartsOn: DayPickerBaseProps['weekStartsOn'];
  useAdditionalWeekYearTokens: boolean | undefined;
  useAdditionalDayOfYearTokens: boolean | undefined;

  onDayClick: DayMouseEventHandler | undefined;
  onDayFocus: DayFocusEventHandler | undefined;
  onDayBlur: DayFocusEventHandler | undefined;
  onDayMouseEnter: DayMouseEventHandler | undefined;
  onDayMouseLeave: DayMouseEventHandler | undefined;
  onDayKeyDown: DayKeyboardEventHandler | undefined;
  onDayKeyUp: DayKeyboardEventHandler | undefined;
  onDayKeyPress: DayKeyboardEventHandler | undefined;
  onDayPointerEnter: DayPointerEventHandler | undefined;
  onDayPointerLeave: DayPointerEventHandler | undefined;
  onDayTouchCancel: DayTouchEventHandler | undefined;
  onDayTouchEnd: DayTouchEventHandler | undefined;
  onDayTouchMove: DayTouchEventHandler | undefined;
  onDayTouchStart: DayTouchEventHandler | undefined;
  onNextClick: MonthChangeEventHandler | undefined;
  onPrevClick: MonthChangeEventHandler | undefined;
  onWeekNumberClick: WeekNumberClickEventHandler | undefined;
  onSelectSingle: DaySelectEventHandler<'single'> | undefined;
  onSelectMulti: DaySelectEventHandler<'multi'> | undefined;
  onSelectRange: DaySelectEventHandler<'range'> | undefined;
}

export const dayPickerContext = createContext<
  DayPickerContext<unknown> | undefined
>(undefined);

/** The props for the {@link DayPickerProvider}. */
export interface DayPickerProviderProps<
  TMode extends DaysSelectionMode = 'single'
> {
  mode: TMode;
  /** The initial props from the DayPicker component. */
  dayPickerProps: Omit<DayPickerProps, 'mode'>;
  children: ReactNode;
}
/**
 * The provider for the {@link dayPickerContext}, storing the props and setting its defaults.
 * Must be the root of all the providers.
 */
export function DayPickerProvider<TMode extends DaysSelectionMode>(
  props: DayPickerProviderProps<TMode>
) {
  const dataAttributes: DataAttributes = {};
  const id = useId();

  Object.entries(props.dayPickerProps).forEach(([key, val]) => {
    if (key.startsWith('data-')) {
      dataAttributes[key] = val;
    }
  });

  const { mode, dayPickerProps } = props;

  const { fromDate, toDate } = parseFromToProps(dayPickerProps);

  const context: DayPickerContext<TMode> = {
    colorScheme: dayPickerProps.colorScheme ?? 'auto',
    contrastPreference: dayPickerProps.contrastPreference ?? 'no-preference',
    mode,
    onSelectSingle:
      mode === 'single'
        ? (dayPickerProps as DayPickerSingleProps).onSelect
        : undefined,
    onSelectMulti:
      mode === 'multi'
        ? (dayPickerProps as DayPickerMultiProps).onSelect
        : undefined,
    onSelectRange:
      mode === 'range'
        ? (dayPickerProps as DayPickerRangeProps).onSelect
        : undefined,

    captionLayout: dayPickerProps.captionLayout || 'buttons',
    className: dayPickerProps.className,
    classNames: {
      ...defaultClassNames,
      ...dayPickerProps.classNames
    },
    components: dayPickerProps.components,
    dataAttributes,
    defaultMonth: dayPickerProps.defaultMonth,
    dir: dayPickerProps.dir,
    disabled: dayPickerProps.disabled,
    disableNavigation: dayPickerProps.disableNavigation || false,
    firstWeekContainsDate: dayPickerProps.firstWeekContainsDate,
    fixedWeeks: dayPickerProps.fixedWeeks || false,
    footer: dayPickerProps.footer,
    formatters: {
      ...formatters,
      ...dayPickerProps.formatters
    },
    fromDate,
    fromMonth: dayPickerProps.fromMonth,
    fromYear: dayPickerProps.fromYear,
    hidden: dayPickerProps.hidden,
    hideWeekdayRow: dayPickerProps.hideWeekdayRow ?? false,
    id: dayPickerProps.id ?? id,
    initialFocus: dayPickerProps.initialFocus ?? false,
    ISOWeek: dayPickerProps.ISOWeek ?? false,
    labels: { ...labels, ...dayPickerProps.labels },
    locale: dayPickerProps.locale ?? enUS,
    max:
      mode === 'multi' || mode === 'range'
        ? (dayPickerProps as DayPickerMultiProps).max
        : undefined,
    min:
      mode === 'multi' || mode === 'range'
        ? (dayPickerProps as DayPickerMultiProps).min
        : undefined,
    modifiers: dayPickerProps.modifiers || undefined,
    modifiersClassNames: dayPickerProps.modifiersClassNames || undefined,
    modifiersStyles: dayPickerProps.modifiersStyles || undefined,
    styles: dayPickerProps.styles,
    month: dayPickerProps.month,
    numberOfMonths: dayPickerProps.numberOfMonths ?? 1,
    pagedNavigation: dayPickerProps.pagedNavigation ?? false,
    required:
      mode === 'single'
        ? Boolean((dayPickerProps as DayPickerSingleProps).required)
        : false,
    reverseMonths: dayPickerProps.reverseMonths ?? false,
    selected:
      mode === 'single'
        ? (dayPickerProps as DayPickerSingleProps).selected
        : mode === 'multi'
        ? (dayPickerProps as DayPickerMultiProps).selected
        : mode === 'range'
        ? (dayPickerProps as DayPickerRangeProps).selected
        : undefined,

    showOutsideDays: dayPickerProps.showOutsideDays ?? false,
    showWeekNumber:
      dayPickerProps.showWeekNumber ?? dayPickerProps.showWeekNumber ?? false,
    style: dayPickerProps.style,
    toDate,
    today: dayPickerProps.today ?? startOfDay(new Date()),
    toMonth: undefined,
    toYear: undefined,
    weekStartsOn: dayPickerProps.weekStartsOn,
    useAdditionalWeekYearTokens: dayPickerProps.useAdditionalWeekYearTokens,
    useAdditionalDayOfYearTokens: dayPickerProps.useAdditionalWeekYearTokens,

    // Events
    onDayBlur: dayPickerProps.onDayBlur,
    onDayClick: dayPickerProps.onDayClick,
    onDayFocus: dayPickerProps.onDayFocus,
    onDayKeyDown: dayPickerProps.onDayKeyDown,
    onDayKeyPress: dayPickerProps.onDayKeyPress,
    onDayKeyUp: dayPickerProps.onDayKeyUp,
    onDayMouseEnter: dayPickerProps.onDayMouseEnter,
    onDayMouseLeave: dayPickerProps.onDayMouseLeave,
    onDayPointerEnter: dayPickerProps.onDayPointerEnter,
    onDayPointerLeave: dayPickerProps.onDayPointerLeave,
    onDayTouchCancel: dayPickerProps.onDayTouchCancel,
    onDayTouchEnd: dayPickerProps.onDayTouchEnd,
    onDayTouchMove: dayPickerProps.onDayTouchMove,
    onDayTouchStart: dayPickerProps.onDayTouchStart,
    onMonthChange: dayPickerProps.onMonthChange,
    onNextClick: dayPickerProps.onNextClick,
    onPrevClick: dayPickerProps.onPrevClick,
    onWeekNumberClick: dayPickerProps.onWeekNumberClick
  };

  return (
    <dayPickerContext.Provider value={context}>
      {props.children}
    </dayPickerContext.Provider>
  );
}

/**
 * Use this hook to access to the DayPicker context within custom components. */
export function useDayPicker() {
  const context = useContext(dayPickerContext);
  if (!context)
    throw new Error(`useProps must be used within a PropsProvider.`);

  return context;
}
