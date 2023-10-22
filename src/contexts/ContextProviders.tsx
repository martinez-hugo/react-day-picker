import { DayPickerProps } from '../DayPicker';
import { CalendarProvider } from './CalendarContext';
import { DayPickerProvider } from './DayPickerContext';
import { ModifiersProvider } from './ModifiersContext';
import { SelectionProvider } from './SelectionContext';

export interface ContextProvidersProps {
  dayPickerProps: DayPickerProps;
  children: React.ReactNode;
}

/**
 * Provide the value for all the context providers.
 * @internal
 */
export function ContextProviders(contextProviderProps: ContextProvidersProps) {
  const { mode = 'none', ...dayPickerProps } =
    contextProviderProps.dayPickerProps;
  return (
    <DayPickerProvider mode={mode} dayPickerProps={dayPickerProps}>
      <CalendarProvider>
        <SelectionProvider mode={mode}>
          <ModifiersProvider>{contextProviderProps.children}</ModifiersProvider>
        </SelectionProvider>
      </CalendarProvider>
    </DayPickerProvider>
  );
}
