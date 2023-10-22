type LocaleString = keyof typeof locales;

import { format, isValid, Locale, parse, startOfMonth } from 'date-fns';
import * as locales from 'date-fns/locale';
import {
  DayPickerBaseProps,
  DayPickerColorScheme,
  DayPickerContrastPreference,
  DayPickerMultiProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  DaysSelectionMode
} from 'react-day-picker';

import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { Select } from '../Select';

export interface PropsFormProps {
  mode: DaysSelectionMode | undefined;
  onModeChange: (mode: DaysSelectionMode | 'none') => void;
  locale: Locale | undefined;
  onLocaleChange: (locale: Locale) => void;
  baseProps: DayPickerBaseProps;
  onBasePropsChange: (baseProps: DayPickerBaseProps) => void;
  singleProps: DayPickerSingleProps;
  onSinglePropsChange: (singleProps: DayPickerSingleProps) => void;
  multiProps: DayPickerMultiProps;
  onMultiPropsChange: (multiProps: DayPickerMultiProps) => void;
  rangeProps: DayPickerRangeProps;
  onRangePropsChange: (rangeProps: DayPickerRangeProps) => void;
  onReset: () => void;
}

const selectionModes: (DaysSelectionMode | 'none')[] = [
  'none',
  'single',
  'multi',
  'range'
];

export function PropsForm(props: PropsFormProps) {
  const {
    mode = 'none',
    onModeChange,
    locale,
    onLocaleChange,
    baseProps,
    onBasePropsChange,
    singleProps,
    onSinglePropsChange,
    multiProps,
    onMultiPropsChange,
    rangeProps,
    onRangePropsChange
  } = props;

  return (
    <Form>
      <Fieldset legend="Selection mode">
        {selectionModes.map((selectionMode) => (
          <Input
            key={selectionMode}
            label={selectionMode || 'none'}
            type="radio"
            name="mode"
            value={selectionMode}
            checked={mode === selectionMode}
            onChange={(e) => {
              onModeChange(e.target.value as DaysSelectionMode);
            }}
          />
        ))}
        {mode === 'single' && (
          <Input
            label="required"
            type="checkbox"
            checked={singleProps.required}
            onChange={(e) => {
              onSinglePropsChange({
                ...singleProps,
                required: e.target.checked
              });
            }}
          />
        )}
        {(mode === 'multi' || mode === 'range') && (
          <>
            <Input
              label="min"
              type="number"
              min="0"
              max="99"
              value={mode === 'multi' ? multiProps?.min : rangeProps?.min}
              onChange={(e) => {
                mode === 'multi'
                  ? onMultiPropsChange({
                      ...multiProps,
                      min:
                        Number(e.target.value) === 0
                          ? undefined
                          : Number(e.target.value)
                    })
                  : onRangePropsChange({
                      ...rangeProps,

                      min:
                        Number(e.target.value) === 0
                          ? undefined
                          : Number(e.target.value)
                    });
              }}
            />
            <Input
              label="max"
              type="number"
              min="0"
              max="99"
              value={mode === 'multi' ? multiProps?.max : rangeProps?.max}
              onChange={(e) => {
                mode === 'multi'
                  ? onMultiPropsChange({
                      ...multiProps,
                      max:
                        Number(e.target.value) === 0
                          ? undefined
                          : Number(e.target.value)
                    })
                  : onRangePropsChange({
                      ...rangeProps,
                      max:
                        Number(e.target.value) === 0
                          ? undefined
                          : Number(e.target.value)
                    });
              }}
            />
          </>
        )}
      </Fieldset>
      <Fieldset legend="Calendar">
        <Input
          label="month"
          type="date"
          value={
            baseProps.month
              ? format(startOfMonth(baseProps.month), 'yyyy-MM-dd')
              : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                month: parsed
              });
            }
          }}
        />
        <Input
          label="showWeekNumber"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              showWeekNumber: e.target.checked
            })
          }
        />
        <Input
          label="hideWeekdayRow"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              hideWeekdayRow: e.target.checked
            })
          }
        />
        <Input
          label="showOutsideDays"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              showOutsideDays: e.target.checked
            })
          }
        />
        <Input
          label="fixedWeeks"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              fixedWeeks: e.target.checked
            })
          }
        />
      </Fieldset>
      <Fieldset legend="Navigation">
        <Input
          label="fromDate"
          type="date"
          value={
            baseProps.fromDate ? format(baseProps.fromDate, 'yyyy-MM-dd') : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                fromDate: parsed
              });
            }
          }}
        />
        <Input
          label="toDate"
          type="date"
          value={baseProps.toDate ? format(baseProps.toDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                toDate: parsed
              });
            }
          }}
        />
        <Input
          label="numberOfMonths"
          type="number"
          min="1"
          max="24"
          value={baseProps.numberOfMonths || ''}
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              numberOfMonths:
                Number(e.target.value) === 0
                  ? undefined
                  : Number(e.target.value)
            })
          }
        />
        <Input
          label="pagedNavigation"
          type="checkbox"
          disabled={
            baseProps.numberOfMonths !== undefined &&
            baseProps.numberOfMonths < 2
          }
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              pagedNavigation: e.target.checked
            })
          }
        />
        <Input
          label="reverseMonths"
          disabled={Boolean(
            baseProps.numberOfMonths && baseProps.numberOfMonths < 2
          )}
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              reverseMonths: e.target.checked
            })
          }
        />
        <Input
          label="disableNavigation"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              disableNavigation: e.target.checked
            })
          }
        />
      </Fieldset>
      <Fieldset legend="Modifiers">
        <Input
          label="disabled"
          type="date"
          value={
            baseProps.disabled && baseProps.disabled instanceof Date
              ? format(baseProps.disabled, 'yyyy-MM-dd')
              : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                disabled: parsed
              });
            }
          }}
        />
        <Input
          label="hidden"
          type="date"
          value={
            baseProps.hidden && baseProps.hidden instanceof Date
              ? format(baseProps.hidden, 'yyyy-MM-dd')
              : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                hidden: parsed
              });
            }
          }}
        />
      </Fieldset>
      <Fieldset legend="Localization">
        <Select
          label="locale"
          value={locale?.code}
          onChange={(e) =>
            // eslint-disable-next-line import/namespace
            onLocaleChange(locales[e.target.value as LocaleString])
          }
        >
          <option></option>
          {Object.keys(locales).map((locale) => {
            return (
              <option key={locale} value={locale}>
                {locale}
              </option>
            );
          })}
        </Select>
        <Select
          label="dir"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              dir: e.target.value
            })
          }
        >
          <option></option>
          <option value={'ltr'}>ltr</option>
          <option value={'rtl'}>rtl</option>
        </Select>
        <Input
          checked={baseProps.ISOWeek}
          label="ISOWeek"
          type="checkbox"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              ISOWeek: e.target.checked
            })
          }
        />
        <Select
          label="weekStartsOn"
          disabled={baseProps.ISOWeek}
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              weekStartsOn: Number(
                e.target.value
              ) as DayPickerBaseProps['weekStartsOn']
            })
          }
        >
          <option></option>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </Select>
        <Select
          label="firstWeekContainsDate"
          disabled={baseProps.ISOWeek}
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              firstWeekContainsDate: Number(
                e.target.value
              ) as DayPickerBaseProps['firstWeekContainsDate']
            })
          }
        >
          <option></option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </Select>
        <Input
          label="today"
          type="date"
          value={baseProps.today ? format(baseProps.today, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onBasePropsChange({
                ...baseProps,
                today: parsed
              });
            }
          }}
        />
      </Fieldset>
      <Fieldset legend="Style">
        <Select
          label="colorScheme"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              colorScheme: e.target.value as DayPickerColorScheme
            })
          }
        >
          <option></option>
          <option value={'auto'}>auto</option>
          <option value={'light'}>light</option>
          <option value={'dark'}>dark</option>
        </Select>
        <Select
          label="contrastPreference"
          onChange={(e) =>
            onBasePropsChange({
              ...baseProps,
              contrastPreference: e.target.value as DayPickerContrastPreference
            })
          }
        >
          <option></option>
          <option value={'no-preference'}>no-preference</option>
          <option value={'less'}>less</option>
          <option value={'more'}>more</option>
        </Select>
      </Fieldset>
    </Form>
  );
}
