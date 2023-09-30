import React from 'react';

import { MonthGrid as DefaultMonthGrid } from 'components/MonthGrid';
import { Nav as DefaultNav } from 'components/Nav';
import { useCalendar } from 'contexts/CalendarContext';
import { useDayPicker } from 'contexts/DayPickerContext';

/**
 * Render the container with navigation and the month grids.
 */
export function Calendar(): JSX.Element {
  const {
    className,
    classNames,
    colorScheme,
    contrastPreference,
    components,
    dataAttributes,
    dir,
    footer,
    id,
    numberOfMonths,
    showWeekNumber,
    style,
    styles
  } = useDayPicker();
  const calendar = useCalendar();

  // const dayPicker = useDayPicker();
  // const focusContext = useFocusContext();
  // const navigation = useNavigation();

  // const [hasInitialFocus, setHasInitialFocus] = useState(false);

  // // Focus the focus target when initialFocus is passed in
  // useEffect(() => {
  //   if (!props.initialFocus) return;
  //   if (!focusContext.focusTarget) return;
  //   if (hasInitialFocus) return;

  //   focusContext.focus(focusContext.focusTarget);
  //   setHasInitialFocus(true);
  // }, [
  //   props.initialFocus,
  //   hasInitialFocus,
  //   focusContext.focus,
  //   focusContext.focusTarget,
  //   focusContext
  // ]);

  // Apply classnames according to props
  const cssClassNames = [classNames.root];
  if (className) {
    cssClassNames.push(className);
  }
  if (numberOfMonths > 1) {
    cssClassNames.push(classNames.multiple_months);
  }
  if (contrastPreference) {
    cssClassNames.push(classNames[`contrast_${contrastPreference}`]);
  }
  if (colorScheme) {
    cssClassNames.push(classNames[`color_${colorScheme}`]);
  }
  if (showWeekNumber) {
    cssClassNames.push(classNames.with_weeknumber);
  }

  const MonthGrid = components?.MonthGrid ?? DefaultMonthGrid;
  const Nav = components?.Nav ?? DefaultNav;

  return (
    <div
      className={cssClassNames.join(' ')}
      style={{ ...styles?.root, ...style }}
      dir={dir}
      id={id}
      {...dataAttributes}
    >
      <Nav />
      <div className={classNames.months_wrapper} style={styles?.months_wrapper}>
        {calendar.months.map((month, i) => (
          <MonthGrid
            aria-labelledby={id}
            key={i}
            displayIndex={i}
            month={month}
          />
        ))}
      </div>
      {footer && (
        <div className={classNames.footer} style={styles?.footer}>
          {footer}
        </div>
      )}
    </div>
  );
}
