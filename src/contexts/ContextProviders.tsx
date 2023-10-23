import { DayPickerProps, Mode } from '../DayPicker';
import { CalendarProvider } from './CalendarContext';
import { DayPickerProvider } from './DayPickerContext';
import { ModifiersProvider } from './ModifiersContext';
import { SelectionProvider } from './SelectionContext';

export interface ContextProvidersProps<T extends Mode | undefined> {
  dayPickerProps: DayPickerProps<T>;
  children: React.ReactNode;
}

/** Provide the value for all the contexts. */
export function ContextProviders<T extends Mode | undefined = undefined>(
  props: ContextProvidersProps<T>
) {
  return (
    <DayPickerProvider dayPickerProps={props.dayPickerProps}>
      <CalendarProvider>
        <SelectionProvider>
          <ModifiersProvider>{props.children}</ModifiersProvider>
        </SelectionProvider>
      </CalendarProvider>
    </DayPickerProvider>
  );
}
