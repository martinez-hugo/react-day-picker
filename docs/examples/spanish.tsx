import React from 'react';

import { es } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

export default function Example() {
  return <DayPicker locale={es} />;
}
