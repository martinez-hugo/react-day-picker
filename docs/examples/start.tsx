import { useState } from 'react';

import { DayPicker } from 'react-day-picker';

export default function App() {
  const [selected, setSelected] = useState<Date>();
  return <DayPicker mode="single" selected={selected} onSelect={setSelected} />;
}
