import { isSameDay } from 'date-fns';
import { DateRange, DayGridCellProps, DayPicker } from 'react-day-picker';

function DayWithShiftKey(props: DayGridCellProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { state } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!state.selected || e.shiftKey) {
      props.htmlAttributes.onClick?.(e);
    }
  };

  return <div {...props.htmlAttributes} ref={ref} onClick={handleClick} />;
}

export default function Example() {
  const [range, setRange] = React.useState<DateRange>();

  let footer = <p>Please pick a day.</p>;

  if (range?.from && range?.to) {
    if (isSameDay(range.from, range.to)) {
      footer = <p>Press Shift to choose more days.</p>;
    } else {
      footer = (
        <p>
          {range.from.toLocaleDateString()}—{range.to.toLocaleDateString()}.
        </p>
      );
    }
  }
  return (
    <DayPicker
      components={{
        DayGridCell: DayWithShiftKey
      }}
      mode="range"
      onSelect={setRange}
      selected={range}
      footer={footer}
    />
  );
}
