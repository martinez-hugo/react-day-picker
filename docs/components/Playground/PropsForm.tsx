type LocaleString = keyof typeof locales;

import {
  DayPickerColorScheme,
  DayPickerContrast,
  DayPickerProps,
  Mode
} from 'react-day-picker';

import { format, isValid, parse } from 'date-fns';
import * as locales from 'date-fns/locale';
import { Fieldset } from '../Fieldset';
import { Form } from '../Form';
import { Input } from '../Input';
import { Select } from '../Select';

const selectionModes: Mode[] = ['single', 'multi', 'range'];

export interface Props {
  dayPickerProps: Partial<DayPickerProps>;
  min?: number | undefined;
  max?: number | undefined;
  onChange: (key: keyof DayPickerProps | 'min' | 'max', value: unknown) => void;
}
export function PropsForm(props: Props) {
  const { onChange: onSubmit } = props;
  const {
    mode,
    required,
    month,
    showWeekNumber,
    hideWeekdayRow,
    showOutsideDays,
    fixedWeeks,
    fromDate,
    toDate,
    numberOfMonths,
    pagedNavigation,
    reverseMonths,
    disableNavigation,
    disabled,
    hidden,
    locale,
    dir,
    ISOWeek,
    weekStartsOn,
    firstWeekContainsDate,
    today,
    colorScheme,
    contrastPreference
  } = props.dayPickerProps;
  const { min, max } = props;
  return (
    <Form>
      <Fieldset legend="Selection mode">
        {selectionModes.map((selectionMode) => (
          <Input
            key={selectionMode}
            label={selectionMode}
            type="radio"
            name="mode"
            value={selectionMode}
            checked={mode === selectionMode || mode === undefined}
            onChange={(e) =>
              onSubmit(
                'mode',
                e.target.value ? (e.target.value as Mode) : undefined
              )
            }
          />
        ))}
        <hr class="border-neutral-500 my-2" />
        <Input
          name="required"
          label="required"
          type="checkbox"
          checked={required}
          onChange={(e) => onSubmit('required', e.target.checked)}
        />
        {(mode === 'multi' || mode === 'range') && (
          <>
            <Input
              name="min"
              label="min"
              type="number"
              min="0"
              max="99"
              value={min}
              onChange={(e) => onSubmit('min', Number(e.target.value))}
            />
            <Input
              name="max"
              label="max"
              type="number"
              min="0"
              max="99"
              value={max}
              onChange={(e) => onSubmit('max', Number(e.target.value))}
            />
          </>
        )}
      </Fieldset>
      <Fieldset legend="Calendar">
        <Input
          name="month"
          label="month"
          type="date"
          value={month ? format(month, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('month', parsed);
            }
          }}
        />
        <Input
          name="showWeekNumber"
          label="showWeekNumber"
          type="checkbox"
          checked={showWeekNumber}
          onChange={(e) => onSubmit('showWeekNumber', e.target.checked)}
        />
        <Input
          name="hideWeekdayRow"
          label="hideWeekdayRow"
          type="checkbox"
          checked={hideWeekdayRow}
          onChange={(e) => onSubmit('hideWeekdayRow', e.target.checked)}
        />
        <Input
          name="showOutsideDays"
          label="showOutsideDays"
          type="checkbox"
          checked={showOutsideDays}
          onChange={(e) => onSubmit('showOutsideDays', e.target.checked)}
        />
        <Input
          name="fixedWeeks"
          label="fixedWeeks"
          type="checkbox"
          checked={fixedWeeks}
          onChange={(e) => onSubmit('fixedWeeks', e.target.checked)}
        />
      </Fieldset>
      <Fieldset legend="Navigation">
        <Input
          name="fromDate"
          label="fromDate"
          type="date"
          value={fromDate ? format(fromDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('fromDate', parsed);
            }
          }}
        />
        <Input
          name="toDate"
          label="toDate"
          type="date"
          value={toDate ? format(toDate, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('toDate', parsed);
            }
          }}
        />
        <Input
          name="numberOfMonths"
          label="numberOfMonths"
          type="number"
          min="1"
          max="24"
          value={numberOfMonths || ''}
          onChange={(e) => onSubmit('numberOfMonths', e.target.value)}
        />
        <Input
          name="pagedNavigation"
          label="pagedNavigation"
          type="checkbox"
          checked={pagedNavigation}
          disabled={numberOfMonths !== undefined && numberOfMonths < 2}
          onChange={(e) => onSubmit('pagedNavigation', e.target.checked)}
        />
        <Input
          name="reverseMonths"
          label="reverseMonths"
          type="checkbox"
          checked={reverseMonths}
          disabled={Boolean(numberOfMonths && numberOfMonths < 2)}
          onChange={(e) => onSubmit('reverseMonths', e.target.checked)}
        />
        <Input
          label="disableNavigation"
          type="checkbox"
          checked={disableNavigation}
          onChange={(e) => onSubmit('disableNavigation', e.target.checked)}
        />
      </Fieldset>
      <Fieldset legend="Modifiers">
        <Input
          name="disabled"
          label="disabled"
          type="date"
          value={
            disabled && disabled instanceof Date
              ? format(disabled, 'yyyy-MM-dd')
              : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('toDate', parsed);
            }
          }}
        />
        <Input
          name="hidden"
          label="hidden"
          type="date"
          value={
            hidden && hidden instanceof Date ? format(hidden, 'yyyy-MM-dd') : ''
          }
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('toDate', parsed);
            }
          }}
        />
      </Fieldset>
      <Fieldset legend="Localization">
        <Select
          name="locale"
          label="locale"
          value={locale?.code}
          onChange={(e) =>
            // eslint-disable-next-line import/namespace
            onSubmit('locale', locales[e.target.value as LocaleString])
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
          name="dir"
          label="dir"
          value={dir}
          onChange={(e) => onSubmit('dir', e.target.value || undefined)}
        >
          <option></option>
          <option value="ltr">ltr</option>
          <option value="rtl">rtl</option>
        </Select>
        <Input
          name="ISOWeek"
          label="ISOWeek"
          type="checkbox"
          checked={ISOWeek}
          onChange={(e) => onSubmit('ISOWeek', e.target.checked)}
        />
        <Select
          name="weekStartsOn"
          label="weekStartsOn"
          value={weekStartsOn}
          disabled={ISOWeek}
          onChange={(e) =>
            onSubmit(
              'weekStartsOn',
              e.target.value ? Number(e.target.value) : undefined
            )
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
          name="firstWeekContainsDate"
          label="firstWeekContainsDate"
          value={firstWeekContainsDate}
          disabled={ISOWeek}
          onChange={(e) =>
            onSubmit(
              'firstWeekContainsDate',
              e.target.value ? Number(e.target.value) : undefined
            )
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
          type="date"
          label="today"
          name="today"
          value={today ? format(today, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const parsed = parse(e.target.value, 'yyyy-MM-dd', new Date());
            if (isValid(parsed)) {
              onSubmit('today', parsed);
            }
          }}
        />
      </Fieldset>
      <Fieldset legend="Style">
        <Select
          label="colorScheme"
          name="colorScheme"
          value={colorScheme}
          onChange={(e) =>
            onSubmit(
              'colorScheme',
              e.target.value
                ? (e.target.value as DayPickerColorScheme)
                : undefined
            )
          }
        >
          <option></option>
          <option value={'auto'}>auto</option>
          <option value={'light'}>light</option>
          <option value={'dark'}>dark</option>
        </Select>
        <Select
          label="contrastPreference"
          name="contrastPreference"
          value={contrastPreference}
          onChange={(e) =>
            onSubmit(
              'contrastPreference',
              e.target.value ? (e.target.value as DayPickerContrast) : undefined
            )
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
