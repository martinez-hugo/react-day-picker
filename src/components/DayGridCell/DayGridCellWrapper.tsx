import React, {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PointerEventHandler,
  TouchEventHandler
} from 'react';

import { DayPickerDay } from 'contexts/CalendarContext';
import { useDayPicker } from 'contexts/DayPickerContext';
import { useModifiers } from 'contexts/ModifiersContext';
import { useSelection } from 'contexts/SelectionContext';

import { DayGridCell as _DayGridCell } from './DayGridCell';
import { getClassNameByMatchingModifiers } from './getClassNameByMatchingModifiers';
import { getStyleFromMatchingModifiers } from './getStyleFromMatchingModifiers';

export interface DayGridCellWrapperProps
  extends Pick<React.AriaAttributes, 'aria-colindex'> {
  day: DayPickerDay;
}

/**
 * Provides a {@link DayGridCell} the day state and the html attributes.
 * Developers may use a `DayGridCell` component without the need to use hooks.
 */
export function DayGridCellWrapper(
  props: DayGridCellWrapperProps
): JSX.Element {
  const {
    classNames,
    components,
    formatters: { formatDay },
    locale,
    mode,
    modifiersClassNames = {},
    modifiersStyles = {},
    onSelectSingle,
    onSelectMulti,
    onSelectRange,
    onDayBlur,
    onDayClick,
    onDayKeyDown,
    onDayKeyPress,
    onDayKeyUp,
    onDayMouseEnter,
    onDayMouseLeave,
    onDayPointerEnter,
    onDayPointerLeave,
    onDayTouchCancel,
    onDayTouchEnd,
    onDayTouchMove,
    onDayTouchStart,
    styles = {}
  } = useDayPicker();

  const selection = useSelection();
  const dayModifiers = useModifiers().getDayModifiers(props.day);
  const style = getStyleFromMatchingModifiers(
    dayModifiers,
    modifiersStyles,
    styles
  );
  const className = getClassNameByMatchingModifiers(
    dayModifiers,
    modifiersClassNames,
    classNames
  );

  const onClick: MouseEventHandler = (e) => {
    switch (mode) {
      case 'single': {
        selection?.setValue(props.day.date, dayModifiers, e);
        onSelectSingle?.(props.day.date, props.day.date, dayModifiers, e);
        break;
      }
      case 'multi': {
        // const newValue = selection.setValue(props.day.date);
        // onSelectMulti?.(newValue, props.day.date, dayModifiers, e);
        break;
      }
      case 'range': {
        // const newValue = selection.setValue(props.day.date);
        // onSelectRange?.(newValue, props.day.date, dayModifiers, e);
        break;
      }
    }
    onDayClick?.(props.day.date, dayModifiers, e);
  };

  // const onFocus: FocusEventHandler = (e) => {
  //   focus(props.day.date);
  //   onDayFocus?.(props.day.date, matchingModifiers, e);
  // };

  const onBlur: FocusEventHandler = (e) => {
    blur();
    onDayBlur?.(props.day.date, dayModifiers, e);
  };

  const onMouseEnter: MouseEventHandler = (e) => {
    onDayMouseEnter?.(props.day.date, dayModifiers, e);
  };
  const onMouseLeave: MouseEventHandler = (e) => {
    onDayMouseLeave?.(props.day.date, dayModifiers, e);
  };
  const onPointerEnter: PointerEventHandler = (e) => {
    onDayPointerEnter?.(props.day.date, dayModifiers, e);
  };
  const onPointerLeave: PointerEventHandler = (e) => {
    onDayPointerLeave?.(props.day.date, dayModifiers, e);
  };
  const onTouchCancel: TouchEventHandler = (e) => {
    onDayTouchCancel?.(props.day.date, dayModifiers, e);
  };
  const onTouchEnd: TouchEventHandler = (e) => {
    onDayTouchEnd?.(props.day.date, dayModifiers, e);
  };
  const onTouchMove: TouchEventHandler = (e) => {
    onDayTouchMove?.(props.day.date, dayModifiers, e);
  };
  const onTouchStart: TouchEventHandler = (e) => {
    onDayTouchStart?.(props.day.date, dayModifiers, e);
  };

  const onKeyUp: KeyboardEventHandler = (e) => {
    onDayKeyUp?.(props.day.date, dayModifiers, e);
  };

  const onKeyPress: KeyboardEventHandler = (e) => {
    onDayKeyPress?.(props.day.date, dayModifiers, e);
  };

  const onKeyDown: KeyboardEventHandler = (e) => {
    // switch (e.key) {
    //   case 'ArrowLeft':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dir === 'rtl' ? focusDayAfter() : focusDayBefore();
    //     break;
    //   case 'ArrowRight':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dir === 'rtl' ? focusDayBefore() : focusDayAfter();
    //     break;
    //   case 'ArrowDown':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     focusWeekAfter();
    //     break;
    //   case 'ArrowUp':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     focusWeekBefore();
    //     break;
    //   case 'PageUp':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     e.shiftKey ? focusYearBefore() : focusMonthBefore();
    //     break;
    //   case 'PageDown':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     e.shiftKey ? focusYearAfter() : focusMonthAfter();
    //     break;
    //   case 'Home':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     focusStartOfWeek();
    //     break;
    //   case 'End':
    //     e.preventDefault();
    //     e.stopPropagation();
    //     focusEndOfWeek();
    //     break;
    // }
    onDayKeyDown?.(props.day.date, dayModifiers, e);
  };

  const htmlAttributes: React.HTMLAttributes<HTMLDivElement> = {
    role: 'gridcell',
    ['aria-colindex']: props['aria-colindex'],
    ['aria-disabled']: dayModifiers.disabled,
    ['aria-hidden']: dayModifiers.hidden,
    ['aria-selected']: dayModifiers.selected,
    className: className,
    style: style,
    tabIndex: dayModifiers.disabled || mode === 'none' ? -1 : 0,
    onBlur,
    onClick,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    onMouseEnter,
    onMouseLeave,
    onPointerEnter,
    onPointerLeave,
    onTouchCancel,
    onTouchEnd,
    onTouchMove,
    onTouchStart
  };

  const DayGridCell = components?.DayGridCell ?? _DayGridCell;

  return (
    <DayGridCell
      day={props.day}
      state={dayModifiers}
      htmlAttributes={htmlAttributes}
    >
      {formatDay(props.day.date, { locale })}
    </DayGridCell>
  );
}
