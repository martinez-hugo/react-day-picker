import React, { useState } from 'react';

import { Locale } from 'date-fns';
import {
  DayPicker,
  DayPickerBaseProps,
  DaysSelectionMode
} from 'react-day-picker';

import {
  DayPickerMultiProps,
  DayPickerRangeProps,
  DayPickerSingleProps
} from '../../../dist';
import { Shadow } from '../Shadow';
import { PropsForm } from './PropsForm';

export function Playground() {
  const [mode, setMode] = useState<DaysSelectionMode | undefined>();
  const [locale, setLocale] = useState<Locale>();
  const [baseProps, setBaseProps] = useState<DayPickerBaseProps>({});
  const [singleProps, setSingleProps] = useState<DayPickerSingleProps>({
    mode: 'single'
  });
  const [multiProps, setMultiProps] = useState<DayPickerMultiProps>({
    mode: 'multi'
  });
  const [rangeProps, setRangeProps] = useState<DayPickerRangeProps>({
    mode: 'range'
  });

  const handleReset = () => {
    setBaseProps({});
    setSingleProps({ mode: 'single' });
    setMultiProps({ mode: 'multi' });
    setRangeProps({ mode: 'range' });
    setMode(undefined);
  };

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Playground</h1>
      <hr className="border-neutral-500 my-4" />
      <div className="flex justify-center flex-col">
        <div>
          <button
            type="button"
            className="border rounded-md px-2 text-left text-xs font-medium mx-4"
            onClick={handleReset}
          >
            Reset Props
          </button>
          <PropsForm
            baseProps={baseProps}
            locale={locale}
            mode={mode}
            multiProps={multiProps}
            rangeProps={rangeProps}
            singleProps={singleProps}
            onModeChange={setMode}
            onLocaleChange={setLocale}
            onBasePropsChange={setBaseProps}
            onSinglePropsChange={setSingleProps}
            onMultiPropsChange={setMultiProps}
            onRangePropsChange={setRangeProps}
            onReset={handleReset}
          />
        </div>
        <div className="pb-36">
          <div className="nx-shadow-lg w-fit p-8 mx-auto">
            <Shadow mode="open">
              <DayPicker
                locale={locale}
                {...(mode === 'single'
                  ? singleProps
                  : mode === 'multi'
                  ? multiProps
                  : mode === 'range'
                  ? rangeProps
                  : baseProps)}
              />
            </Shadow>
          </div>
        </div>
      </div>
    </div>
  );
}
