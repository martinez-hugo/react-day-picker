import { DayPicker } from 'react-day-picker';

import { useState } from 'react';

export default function App() {
  const [selected, setSelected] = useState<Date>();
  return <DayPicker selected={selected} onSelect={setSelected} />;
}
