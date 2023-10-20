import { DayPicker } from 'react-day-picker';

export default function Example() {
  const [selected, setSelected] = React.useState<Date>();
  return <DayPicker mode="single" selected={selected} onSelect={setSelected} />;
}
