import { createContext, ReactNode, useContext, useId } from 'react';

import { Locale, startOfDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
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

import { CaptionLayout } from '../../components/Nav';
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
  mode: TMode | unknown;

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
  selected?: DayPickerBaseProps['selected'];
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
export interface DayPickerProviderProps<TMode extends DaysSelectionMode> {
  mode: TMode;
  /** The initial props from the DayPicker component. */
  dayPickerProps: DayPickerProps;
  children: ReactNode;
}
/**
 * The provider for the {@link dayPickerContext}, storing the props and setting its defaults.
 * Must be the root of all the providers.
 */
export function DayPickerProvider<TMode extends DaysSelectionMode>(
  providerProps: DayPickerProviderProps<TMode>
) {
  const dataAttributes: DataAttributes = {};
  const id = useId();

  Object.entries(providerProps.dayPickerProps).forEach(([key, val]) => {
    if (key.startsWith('data-')) {
      dataAttributes[key] = val;
    }
  });

  const props = providerProps.dayPickerProps;
  const { fromDate, toDate } = parseFromToProps(props);

  const context: DayPickerContext<TMode> = {
    colorScheme: props.colorScheme ?? 'auto',
    contrastPreference: props.contrastPreference ?? 'no-preference',
    mode: providerProps.mode,
    onSelectSingle:
      providerProps.mode === 'single'
        ? (props as DayPickerSingleProps).onSelect
        : undefined,
    onSelectMulti:
      providerProps.mode === 'multi'
        ? (props as DayPickerMultiProps).onSelect
        : undefined,
    onSelectRange:
      providerProps.mode === 'range'
        ? (props as DayPickerRangeProps).onSelect
        : undefined,

    captionLayout: props.captionLayout || 'buttons',
    className: props.className,
    classNames: {
      ...defaultClassNames
    },
    components: props.components,
    dataAttributes,
    defaultMonth: props.defaultMonth,
    dir: props.dir,
    disabled: props.disabled,
    disableNavigation: props.disableNavigation || false,
    firstWeekContainsDate: props.firstWeekContainsDate,
    fixedWeeks: props.fixedWeeks || false,
    footer: props.footer,
    formatters: {
      ...formatters,
      ...props.formatters
    },
    fromDate,
    fromMonth: props.fromMonth,
    fromYear: props.fromYear,
    hidden: props.hidden,
    hideWeekdayRow: props.hideWeekdayRow ?? false,
    id: props.id ?? id,
    initialFocus: props.initialFocus ?? false,
    ISOWeek: props.ISOWeek ?? false,
    labels: { ...labels, ...props.labels },
    locale: props.locale ?? enUS,
    max:
      props.mode === 'multi' || props.mode === 'range' ? props.max : undefined,
    min:
      props.mode === 'multi' || props.mode === 'range' ? props.min : undefined,
    modifiers: props.modifiers || undefined,
    modifiersClassNames: props.modifiersClassNames || undefined,
    modifiersStyles: props.modifiersStyles || undefined,
    styles: props.styles,
    month: props.month,
    numberOfMonths: props.numberOfMonths ?? 1,
    pagedNavigation: props.pagedNavigation ?? false,
    required: props.mode === 'single' ? props.required ?? false : false,
    reverseMonths: props.reverseMonths ?? false,
    selected: props.selected,
    showOutsideDays: props.showOutsideDays ?? false,
    showWeekNumber: props.showWeekNumber ?? props.showWeekNumber ?? false,
    style: props.style,
    toDate,
    today: props.today ?? startOfDay(new Date()),
    toMonth: undefined,
    toYear: undefined,
    weekStartsOn: props.weekStartsOn,
    useAdditionalWeekYearTokens: props.useAdditionalWeekYearTokens,
    useAdditionalDayOfYearTokens: props.useAdditionalWeekYearTokens,

    // Events
    onDayBlur: props.onDayBlur,
    onDayClick: props.onDayClick,
    onDayFocus: props.onDayFocus,
    onDayKeyDown: props.onDayKeyDown,
    onDayKeyPress: props.onDayKeyPress,
    onDayKeyUp: props.onDayKeyUp,
    onDayMouseEnter: props.onDayMouseEnter,
    onDayMouseLeave: props.onDayMouseLeave,
    onDayPointerEnter: props.onDayPointerEnter,
    onDayPointerLeave: props.onDayPointerLeave,
    onDayTouchCancel: props.onDayTouchCancel,
    onDayTouchEnd: props.onDayTouchEnd,
    onDayTouchMove: props.onDayTouchMove,
    onDayTouchStart: props.onDayTouchStart,
    onMonthChange: props.onMonthChange,
    onNextClick: props.onNextClick,
    onPrevClick: props.onPrevClick,
    onWeekNumberClick: props.onWeekNumberClick
  };

  return (
    <dayPickerContext.Provider value={context}>
      {providerProps.children}
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
