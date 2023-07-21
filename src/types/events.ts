import React from 'react';

import { DayPickerSelectedValue, DaysSelectionMode } from 'DayPicker';

import { DayState } from './modifiers';

export type DaySelectEventHandler<TMode extends DaysSelectionMode> = (
  days: DayPickerSelectedValue<TMode>,
  selectedDay: Date,
  state: DayState,
  e: React.MouseEvent
) => void;

export type DayEventHandler<TEvent> = (
  day: Date,
  state: DayState,
  e: TEvent
) => void;

/**
 * The event handler when a day is clicked.
 *
 * @deprecated Use {@link DayMouseEventHandler} instead.
 */
export type DayClickEventHandler = DayEventHandler<React.MouseEvent>;

/** The event handler when a day is focused. */
export type DayFocusEventHandler = DayEventHandler<
  React.FocusEvent | React.KeyboardEvent
>;

/** The event handler when a day gets a keyboard event. */
export type DayKeyboardEventHandler = DayEventHandler<React.KeyboardEvent>;

/** The event handler when a day gets a mouse event. */
export type DayMouseEventHandler = DayEventHandler<React.MouseEvent>;

/** The event handler when a day gets a pointer event. */
export type DayPointerEventHandler = DayEventHandler<React.PointerEvent>;

/** The event handler when a month is changed in the calendar. */
export type MonthChangeEventHandler = (month: Date) => void;

/**The event handler when the week number is clicked. */
export type WeekNumberClickEventHandler = (
  /** The week number that has been clicked. */
  weekNumber: number,
  /** The dates in the clicked week. */
  dates: Date[],
  /** The mouse event that triggered this event. */
  e: React.MouseEvent
) => void;

/** The event handler when a day gets a touch event. */
export type DayTouchEventHandler = DayEventHandler<React.TouchEvent>;
