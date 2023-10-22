import { DayPicker } from 'react-day-picker';

import { format } from 'date-fns';
import { useState } from 'react';

export default function App() {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  return (
    <DayPicker
      selected={selectedDay}
      required
      onSelect={setSelectedDay}
      footer={selectedDay ? `You selected ${format(selectedDay, 'PPP')}` : ''}
    />
  );
}
