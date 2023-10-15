import React from 'react';

import { format } from 'date-fns';
import { arSA } from 'date-fns/locale';
import { DayPicker, Formatters } from 'react-day-picker';

const NU_LOCALE = 'ar-u-nu-arab';

const formatDay: Formatters['formatDay'] = (day) =>
  day.getDate().toLocaleString(NU_LOCALE);

const formatWeekNumber: Formatters['formatWeekNumber'] = (weekNumber) => {
  return weekNumber.toLocaleString(NU_LOCALE);
};

const formatCaption: Formatters['formatCaption'] = (date, options) => {
  const y = date.getFullYear().toLocaleString(NU_LOCALE);
  const m = format(date, 'LLLL', { locale: options?.locale });
  return `${m} ${y}`;
};

export default function Example() {
  return (
    <DayPicker
      locale={arSA}
      dir="rtl"
      showWeekNumber
      formatters={{ formatDay, formatCaption, formatWeekNumber }}
    />
  );
}
