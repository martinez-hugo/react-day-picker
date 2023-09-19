import React, { useState } from 'react';

import { Locale } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = (searchParams?.get('mode') as DaysSelectionMode) || 'none';

  const [locale, setLocale] = useState<Locale>();

  const baseProps = JSON.parse(
    searchParams?.get('baseProps') ?? '{}'
  ) as DayPickerBaseProps;

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
    router.push(``);
  };

  const handleModeChange = (mode: DaysSelectionMode) => {
    const qs = new URLSearchParams({
      mode
    });

    router.push(`?${qs.toString()}&`);
  };
  const handleBasePropsChange = (baseProps: DayPickerBaseProps) => {
    const qs = new URLSearchParams({
      mode,
      baseProps: JSON.stringify(baseProps)
    });
    router.push(`?${qs.toString()}`);
  };

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Playground</h1>
      <hr className="border-neutral-500 my-4" />
      <div className="flex flex-col">
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
            onLocaleChange={setLocale}
            onModeChange={handleModeChange}
            onBasePropsChange={handleBasePropsChange}
            onSinglePropsChange={setSingleProps}
            onMultiPropsChange={setMultiProps}
            onRangePropsChange={setRangeProps}
            onReset={handleReset}
          />
        </div>
        <div className="pb-36">
          <div className="nxe-shadow-lg w-fit p-8 mx-auto">
            <Shadow mode="open">
              <DayPicker
                locale={locale}
                {...(mode === 'single'
                  ? { ...baseProps, ...singleProps }
                  : mode === 'multi'
                  ? { ...baseProps, ...multiProps }
                  : mode === 'range'
                  ? { ...baseProps, ...rangeProps }
                  : baseProps)}
              />
            </Shadow>
          </div>
        </div>
      </div>
    </div>
  );
}
