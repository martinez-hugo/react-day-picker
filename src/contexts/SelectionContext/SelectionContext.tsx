import { isSameDay } from 'date-fns';
import { createContext, useContext, useState } from 'react';

import { useDayPicker } from '../../contexts/DayPickerContext';

import type { ReactNode } from 'react';
import type { Mode, Selected, SelectHandler } from '../../DayPicker';
import type { DateRange, Modifiers } from '../../types';

export type SelectionContext<T extends Mode> = {
  selected: Selected<T>;
  setSelected: (
    date: Date,
    modifiers: Modifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) => Selected<T>;
  isSelected: (date: Date) => boolean;
};

const initialContextValue = {
  selected: undefined,
  setSelected: () => undefined,
  isSelected: () => false
};
export const singleSelectionContext = createContext<
  SelectionContext<'single'> | undefined
>(initialContextValue);

export const rangeSelectionContext = createContext<
  SelectionContext<'range'> | undefined
>(initialContextValue);

export const multiSelectionContext =
  createContext<SelectionContext<'multi'>>(initialContextValue);

/**
 * The provider for the {@link selectionContext}, storing the calendar state.
 */
export function SelectionProvider(providerProps: { children?: ReactNode }) {
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

  function setSelectedSingle(
    date: Date,
    modifiers: Modifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) {
    let newSingleValue: Selected<'single'>;
    if (modifiers.selected && !required) {
      newSingleValue = undefined;
    } else {
      newSingleValue = date;
    }
    setInternalSingleValue(newSingleValue);
    (onSelect as SelectHandler<'single'>)?.(newSingleValue, date, modifiers, e);
    return newSingleValue;
  }
  function isSelectedSingle(date: Date) {
    return Boolean(singleValue && isSameDay(singleValue, date));
  }

  function setSelectedMulti(
    date: Date,
    modifiers: Modifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) {
    debugger;
    let newMultiValue: Selected<'multi'> = [];
    if (modifiers.selected && !required) {
      newMultiValue = multiValue?.filter((day) => !isSameDay(day, date));
    } else {
      newMultiValue = [...(multiValue ?? []), date];
    }
    setInternalMultiValue(newMultiValue);
    (onSelect as SelectHandler<'multi'>)?.(newMultiValue, date, modifiers, e);
    return multiValue;
  }
  function isSelectedMulti(date: Date) {
    return Boolean(
      multiValue && multiValue.some((day) => isSameDay(day, date))
    );
  }

  function setSelectedRange(
    date: Date,
    modifiers: Modifiers,
    e: React.MouseEvent<Element, MouseEvent>
  ) {
    // TODO
    setInternalRangeValue(rangeValue);
    return rangeValue;
  }
  function isSelectedRange(date: Date) {
    return Boolean(
      multiValue && multiValue.some((day) => isSameDay(day, date))
    );
  }

  switch (mode as Mode) {
    case 'single':
      return (
        <singleSelectionContext.Provider
          value={{
            selected: singleValue,
            setSelected: setSelectedSingle,
            isSelected: isSelectedSingle
          }}
        >
          {providerProps.children}
        </singleSelectionContext.Provider>
      );
    // case 'multiple':
    case 'multi':
      return (
        <multiSelectionContext.Provider
          value={{
            selected: multiValue,
            setSelected: setSelectedMulti,
            isSelected: isSelectedMulti
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
            isSelected: isSelectedRange
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
  const dayPicker = useDayPicker();
  const singleContext = useContext(singleSelectionContext);
  const multiContext = useContext(multiSelectionContext);
  const rangeContext = useContext(rangeSelectionContext);

  if (!singleContext || !multiContext || !rangeContext) {
    throw new Error(`useSelection must be used within a SelectionProvider.`);
  }
  if (dayPicker.mode === 'single') {
    return singleContext;
  }
  if (dayPicker.mode === 'multi') {
    return multiContext;
  }
  if (dayPicker.mode === 'range') {
    return rangeContext;
  }
}
