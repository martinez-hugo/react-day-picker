import React from 'react';

import { arSA } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

export default function Example() {
  return <DayPicker dir="rtl" locale={arSA} />;
}
