import React from 'react';

import { startOfYear } from 'date-fns';
import { DayPicker } from 'react-day-picker';

export default function App() {
  return (
    <DayPicker
      defaultMonth={startOfYear(new Date())}
      weekStartsOn={6} // Saturday as first day of the week
      firstWeekContainsDate={4} // Number the first week of the year from day 4
      showWeekNumber
      formatters={{
        // Add `W` prefix to week number
        formatWeekNumber: (weekNumber: number) => `W${weekNumber}`
      }}
    />
  );
}
