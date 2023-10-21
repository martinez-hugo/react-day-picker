import { useState } from 'react';

import { Locale } from 'date-fns';
import { useRouter } from 'next/router';
import {
  DayPicker,
  DayPickerBaseProps,
  DayPickerMultiProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  DaysSelectionMode
} from 'react-day-picker';

import { RenderingBox } from '../RenderingBox';
import { Shadow } from '../Shadow';
import { PropsForm } from './PropsForm';

export function Playground() {
  const router = useRouter();

  const [mode, setMode] = useState<DaysSelectionMode>();
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
    setMode(undefined);
    setMultiProps({ mode: 'multi' });
    setSingleProps({ mode: 'single' });
    setRangeProps({ mode: 'range' });
    setBaseProps({});
    router.push(``);
  };

  const handleBookmark = () => {
    const searchParams = new URLSearchParams(
      baseProps as Record<string, string>
    );
    searchParams.toString() && router.push(`#${searchParams.toString()}`);
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
            onClick={handleBookmark}
          >
            Bookmark
          </button>
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
            onModeChange={setMode}
            onBasePropsChange={setBaseProps}
            onSinglePropsChange={setSingleProps}
            onMultiPropsChange={setMultiProps}
            onRangePropsChange={setRangeProps}
            onReset={handleReset}
          />
        </div>
        <div className="pb-36">
          <div
            className={`nxe-shadow-lg w-fit p-8 mx-auto ${
              baseProps.colorScheme === 'dark'
                ? 'bg-black text-white'
                : baseProps.colorScheme === 'light'
                ? 'bg-white text-black'
                : 'bg-transparent'
            }`}
          >
            <RenderingBox>
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
            </RenderingBox>
          </div>
        </div>
      </div>
    </div>
  );
}
