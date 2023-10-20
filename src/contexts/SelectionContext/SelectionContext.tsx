import { createContext, ReactNode, useContext, useState } from 'react';

import { isSameDay } from 'date-fns';
import { DayPickerSelectedValue, DaysSelectionMode } from '../../DayPicker';

import { useDayPicker } from '../../contexts/DayPickerContext';
import { DateRange, MatchingModifiers } from '../../types';

export type SelectionContext<TMode extends DaysSelectionMode | unknown> = {
  value: DayPickerSelectedValue<TMode>;
  setValue: (
    selectedDate: Date,
    dayModifiers: MatchingModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => DayPickerSelectedValue<TMode>;
  isSelected: (date: Date) => boolean;
};

export const singleSelectionContext = createContext<
  SelectionContext<'single'> | undefined
>({ value: undefined, setValue: () => undefined, isSelected: () => false });

export const rangeSelectionContext = createContext<
  SelectionContext<'range'> | undefined
>({
  value: { from: undefined },
  setValue: () => ({ from: undefined }),
  isSelected: () => false
});

export const multiSelectionContext = createContext<SelectionContext<'multi'>>({
  value: [],
  setValue: () => [],
  isSelected: () => false
});

/**
 * The provider for the {@link selectionContext}, storing the calendar state.
 */
export function SelectionProvider<
  TMode extends DaysSelectionMode
>(providerProps: { children?: ReactNode; mode: TMode }) {
  const { required, onSelectSingle, mode } = useDayPicker();

  const initialSingleValue = undefined;
  const [singleValue, setInternalSingleValue] = useState<
    DayPickerSelectedValue<'single'> | undefined
  >(initialSingleValue);

  const initialMultiValue: DayPickerSelectedValue<'multi'> = [];
  const [multiValue, setInternalMultiValue] = useState(initialMultiValue);

  const initialRangeValue: DateRange = { from: undefined, to: undefined };
  const [rangeValue, setInternalRangeValue] = useState(initialRangeValue);

  const setSingleValue = (
    date: Date,
    dayModifiers: MatchingModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    let newSingleValue: DayPickerSelectedValue<'single'>;
    if (singleValue && isSameDay(singleValue, date) && !required) {
      newSingleValue = undefined;
    } else {
      newSingleValue = date;
    }
    setInternalSingleValue(newSingleValue);
    onSelectSingle?.(newSingleValue, date, dayModifiers, e);
    return newSingleValue;
  };

  const setMultiValue = () => {
    setInternalMultiValue(multiValue);
    return multiValue;
  };

  const setRangeValue = () => {
    setInternalRangeValue(rangeValue);
    return rangeValue;
  };

  switch (mode) {
    case 'single':
      return (
        <singleSelectionContext.Provider
          value={{
            value: singleValue,
            setValue: setSingleValue,
            isSelected: (date: Date) =>
              Boolean(singleValue && isSameDay(singleValue, date))
          }}
        >
          {providerProps.children}
        </singleSelectionContext.Provider>
      );
    case 'multiple':
      return (
        <multiSelectionContext.Provider
          value={{
            value: multiValue,
            setValue: setMultiValue,
            isSelected: (date: Date) => Boolean(date) // TODO
          }}
        >
          {providerProps.children}
        </multiSelectionContext.Provider>
      );
    case 'range':
      return (
        <rangeSelectionContext.Provider
          value={{
            value: rangeValue,
            setValue: setRangeValue,
            isSelected: (date: Date) => Boolean(date) // TODO
          }}
        >
          {providerProps.children}
        </rangeSelectionContext.Provider>
      );
    default:
      return <>{providerProps.children}</>;
  }
}

/**
 * Use this hook to access to the dates displayed in the calendar and to navigate between months.
 */
export function useSelection(): SelectionContext<unknown> | undefined {
  const { mode } = useDayPicker();

  const singleContext = useContext(singleSelectionContext);
  const multiContext = useContext(multiSelectionContext);
  const rangeContext = useContext(rangeSelectionContext);

  if (!singleContext || !multiContext || !rangeContext)
    throw new Error(`useSelection must be used within a SelectionProvider.`);

  if (mode === 'single') return singleContext;
  if (mode === 'multi') return multiContext;
  if (mode === 'range') return rangeContext;

  return undefined;
}
