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
export function ContextProviders(props: ContextProvidersProps) {
  const { mode = 'single', ...dayPickerProps } = props.dayPickerProps;
  return (
    <DayPickerProvider mode={mode} dayPickerProps={dayPickerProps}>
      <CalendarProvider>
        <SelectionProvider mode={mode}>
          <ModifiersProvider>{props.children}</ModifiersProvider>
        </SelectionProvider>
      </CalendarProvider>
    </DayPickerProvider>
  );
}
