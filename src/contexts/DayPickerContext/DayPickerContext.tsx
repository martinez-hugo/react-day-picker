import { enUS } from 'date-fns/locale';
import { createContext, ReactNode, useContext, useId } from 'react';

import { CaptionLayout } from '../../components/Nav';
import { DayPickerProps, Mode } from '../../DayPicker';
import * as formatters from '../../formatters';
import * as labels from '../../labels';
import {
  ClassNames,
  DayPickerColorScheme,
  DayPickerContrast,
  Formatters,
  Labels
} from '../../types';

import { defaultClassNames } from './defaultClassNames';
import { parseFromToProps } from './utils/parseFromToProps';

/** A record with `data-*` attributes passed to {@link DayPicker}. */
export type DataAttributes = Record<string, unknown>;

export type DefaultProps = {
  captionLayout: CaptionLayout;
  classNames: Required<ClassNames>;
  colorScheme: DayPickerColorScheme;
  contrastPreference: DayPickerContrast;
  formatters: Required<Formatters>;
  id: string;
  labels: Labels;
  locale: Locale;
  mode: Mode;
  numberOfMonths: number;
  today: Date;
  fromDate: Date | undefined;
  toDate: Date | undefined;
};

/**
 * The {@link DayPickerProps} with their default values. Use this type within
 * internal components to use safe props and avoid all conditionals.
 */
export type DayPickerContext<T extends Mode | undefined> = DayPickerProps<T> &
  DefaultProps & { dataAttributes: DataAttributes };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dayPickerContext = createContext<DayPickerContext<any> | null>(
  null
);

/** The props for the {@link DayPickerProvider}. */
export interface DayPickerProviderProps<T extends Mode | undefined> {
  /** The initial props from the DayPicker component. */
  dayPickerProps: DayPickerProps<T>;
  children: ReactNode;
}

/**
 * The provider for the {@link dayPickerContext}, storing the props and setting its defaults.
 * Must be the root of all the providers.
 */
export function DayPickerProvider<T extends Mode | undefined = undefined>(
  props: DayPickerProviderProps<T>
) {
  const dataAttributes: DataAttributes = {};
  const id = useId();

  Object.entries(props.dayPickerProps).forEach(([key, val]) => {
    if (key.startsWith('data-')) {
      dataAttributes[key] = val;
    }
  });

  const { dayPickerProps } = props;

  const { fromDate, toDate } = parseFromToProps(dayPickerProps);

  const defaultProps: DefaultProps = {
    mode: 'single',
    fromDate,
    toDate,
    captionLayout: 'buttons',
    classNames: defaultClassNames,
    colorScheme: 'auto',
    contrastPreference: 'no-preference',
    formatters,
    id,
    labels,
    locale: enUS,
    numberOfMonths: 1,
    today: new Date()
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const context: DayPickerContext<any> = {
    ...defaultProps,
    ...dayPickerProps,
    classNames: {
      ...defaultProps.classNames,
      ...dayPickerProps.classNames
    },
    labels: {
      ...defaultProps.labels,
      ...dayPickerProps.labels
    },
    formatters: {
      ...defaultProps.formatters,
      ...dayPickerProps.formatters
    },
    dataAttributes
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
