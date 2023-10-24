import { DayPicker, DayPickerProps, Selected } from 'react-day-picker';

import { useState } from 'react';
import { RenderingBox } from '../RenderingBox';
import { Shadow } from '../Shadow';
import { PropsForm } from './PropsForm';

export function Playground() {
  const [props, setProps] = useState<DayPickerProps>({});
  const [selected, setSelected] = useState<unknown>(new Date());

  const renderClassName =
    props.colorScheme === 'dark'
      ? 'bg-black text-white'
      : props.colorScheme === 'light'
      ? 'bg-white text-black'
      : 'bg-transparent';

  return (
    <div>
      <h1 className="text-3xl my-4 font-bold">Playground</h1>
      <hr className="border-neutral-500 my-4" />
      <div className="flex flex-col">
        <div>
          <button
            type="button"
            className="border rounded-md px-2 text-left text-xs font-medium mx-4"
            onClick={() => setProps({})}
          >
            Reset Props
          </button>
          <PropsForm
            dayPickerProps={props}
            onChange={(key, value) => setProps({ ...props, [key]: value })}
          />
        </div>
        <div className="pb-36">
          <div className={`nxe-shadow-lg w-fit p-8 mx-auto ${renderClassName}`}>
            <RenderingBox>
              <Shadow mode="open">
                <DayPicker {...props} onSelect={setSelected} />
              </Shadow>
            </RenderingBox>
          </div>
        </div>
      </div>
    </div>
  );
}
