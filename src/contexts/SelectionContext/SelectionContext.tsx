import { isSameDay } from 'date-fns';
import { createContext, ReactNode, useContext, useState } from 'react';
import { useDayPicker } from '../../contexts/DayPickerContext';
import { Mode, Selected, SelectHandler } from '../../DayPicker';
import { DateRange, MatchingModifiers } from '../../types';

export type SelectionContext<T extends Mode> = {
  selected: Selected<T>;
  setSelected: (
    selectedDate: Date,
    dayModifiers: MatchingModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => Selected<T>;
  isSelected: (date: Date) => boolean;
};

export const singleSelectionContext = createContext<
  SelectionContext<'single'> | undefined
>({
  selected: undefined,
  setSelected: () => undefined,
  isSelected: () => false
});

export const rangeSelectionContext = createContext<
  SelectionContext<'range'> | undefined
>({
  selected: { from: undefined },
  setSelected: () => ({ from: undefined }),
  isSelected: () => false
});

export const multiSelectionContext = createContext<SelectionContext<'multi'>>({
  selected: [],
  setSelected: () => [],
  isSelected: () => false
});

/**
 * The provider for the {@link selectionContext}, storing the calendar state.
 */
export function SelectionProvider<TMode extends Mode>(providerProps: {
  children?: ReactNode;
  mode: TMode;
}) {
  const { required, onSelect, mode, selected } = useDayPicker();

  const initialSingleValue =
    mode === 'single' ? (selected as Selected<'single'>) : undefined;
  const [singleValue, setInternalSingleValue] = useState(initialSingleValue);

  const initialMultiValue =
    mode === 'multi' ? (selected as Selected<'multi'>) : [];
  const [multiValue, setInternalMultiValue] = useState(initialMultiValue);

  const initialRangeValue =
    mode === 'multi'
      ? (selected as Selected<'range'>)
      : ({ from: undefined, to: undefined } as DateRange);
  const [rangeValue, setInternalRangeValue] = useState(initialRangeValue);

  const setSelectedSingle = (
    date: Date,
    dayModifiers: MatchingModifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    let newSingleValue: Selected<'single'>;
    if (dayModifiers.selected && !required) {
      newSingleValue = undefined;
    } else {
      newSingleValue = date;
    }
    setInternalSingleValue(newSingleValue);
    (onSelect as SelectHandler<'single'>)?.(
      newSingleValue,
      date,
      dayModifiers,
      e
    );
    return newSingleValue;
  };

  const setSelectedMulti = () => {
    setInternalMultiValue(multiValue);
    return multiValue;
  };

  const setSelectedRange = () => {
    setInternalRangeValue(rangeValue);
    return rangeValue;
  };

  switch (mode) {
    case 'single':
      return (
        <singleSelectionContext.Provider
          value={{
            selected: singleValue,
            setSelected: setSelectedSingle,
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
            selected: multiValue,
            setSelected: setSelectedMulti,
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
            selected: rangeValue,
            setSelected: setSelectedRange,
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
export function useSelection() {
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
