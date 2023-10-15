import { getMonthsAndDates } from './getMonthsAndDates';

const today = new Date(2023, 6, 19);

jest.setSystemTime(today);

const firstMonth = today;
const toDate = undefined;
const numberOfMonths = 1;
const reverseMonths = false;
const ISOWeek = false;
const fixedWeeks = false;

describe('when using the default options', () => {
  const calendar = getMonthsAndDates(
    firstMonth,
    toDate,
    numberOfMonths,
    reverseMonths,
    ISOWeek,
    fixedWeeks,
    {}
  );
  test('should match the snapshot', () => {
    expect(calendar).toMatchInlineSnapshot(`
      {
        "dates": [
          2023-06-25T05:00:00.000Z,
          2023-06-26T05:00:00.000Z,
          2023-06-27T05:00:00.000Z,
          2023-06-28T05:00:00.000Z,
          2023-06-29T05:00:00.000Z,
          2023-06-30T05:00:00.000Z,
          2023-07-01T05:00:00.000Z,
          2023-07-02T05:00:00.000Z,
          2023-07-03T05:00:00.000Z,
          2023-07-04T05:00:00.000Z,
          2023-07-05T05:00:00.000Z,
          2023-07-06T05:00:00.000Z,
          2023-07-07T05:00:00.000Z,
          2023-07-08T05:00:00.000Z,
          2023-07-09T05:00:00.000Z,
          2023-07-10T05:00:00.000Z,
          2023-07-11T05:00:00.000Z,
          2023-07-12T05:00:00.000Z,
          2023-07-13T05:00:00.000Z,
          2023-07-14T05:00:00.000Z,
          2023-07-15T05:00:00.000Z,
          2023-07-16T05:00:00.000Z,
          2023-07-17T05:00:00.000Z,
          2023-07-18T05:00:00.000Z,
          2023-07-19T05:00:00.000Z,
          2023-07-20T05:00:00.000Z,
          2023-07-21T05:00:00.000Z,
          2023-07-22T05:00:00.000Z,
          2023-07-23T05:00:00.000Z,
          2023-07-24T05:00:00.000Z,
          2023-07-25T05:00:00.000Z,
          2023-07-26T05:00:00.000Z,
          2023-07-27T05:00:00.000Z,
          2023-07-28T05:00:00.000Z,
          2023-07-29T05:00:00.000Z,
          2023-07-30T05:00:00.000Z,
          2023-07-31T05:00:00.000Z,
          2023-08-01T05:00:00.000Z,
          2023-08-02T05:00:00.000Z,
          2023-08-03T05:00:00.000Z,
          2023-08-04T05:00:00.000Z,
          2023-08-05T05:00:00.000Z,
        ],
        "months": [
          DayPickerMonth {
            "date": 2023-07-01T05:00:00.000Z,
            "weeks": [
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-06-25T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-06-26T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-06-27T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-06-28T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-06-29T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-06-30T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-01T05:00:00.000Z,
                  },
                ],
                "weekNumber": 26,
              },
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-07-02T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-03T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-04T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-05T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-06T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-07T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-08T05:00:00.000Z,
                  },
                ],
                "weekNumber": 27,
              },
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-07-09T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-10T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-11T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-12T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-13T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-14T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-15T05:00:00.000Z,
                  },
                ],
                "weekNumber": 28,
              },
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-07-16T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-17T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-18T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-19T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-20T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-21T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-22T05:00:00.000Z,
                  },
                ],
                "weekNumber": 29,
              },
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-07-23T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-24T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-25T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-26T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-27T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-28T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-29T05:00:00.000Z,
                  },
                ],
                "weekNumber": 30,
              },
              DayPickerWeek {
                "days": [
                  DayPickerDay {
                    "date": 2023-07-30T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-07-31T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-08-01T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-08-02T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-08-03T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-08-04T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                  DayPickerDay {
                    "date": 2023-08-05T05:00:00.000Z,
                    "displayMonth": 2023-07-01T05:00:00.000Z,
                  },
                ],
                "weekNumber": 31,
              },
            ],
          },
        ],
      }
    `);
  });
  test('should return 1 month', () => {
    expect(calendar.months).toHaveLength(1);
  });
  test('should return 42 dates', () => {
    expect(calendar.dates).toHaveLength(42);
  });
  test('the first date should be sunday', () => {
    expect(calendar.dates[0].getDay()).toBe(0);
  });
  test('the last date should be sunday', () => {
    expect(calendar.dates[0].getDay()).toBe(0);
  });
});

describe('when using fixed weeks', () => {
  const calendar = getMonthsAndDates(
    today,
    toDate,
    numberOfMonths,
    reverseMonths,
    ISOWeek,
    true,
    {}
  );
  test('should return 42 dates', () => {
    expect(calendar.dates).toHaveLength(42);
  });
  test('dates should match the snapshot', () => {
    expect(calendar.dates).toMatchInlineSnapshot(`
      [
        2023-06-25T05:00:00.000Z,
        2023-06-26T05:00:00.000Z,
        2023-06-27T05:00:00.000Z,
        2023-06-28T05:00:00.000Z,
        2023-06-29T05:00:00.000Z,
        2023-06-30T05:00:00.000Z,
        2023-07-01T05:00:00.000Z,
        2023-07-02T05:00:00.000Z,
        2023-07-03T05:00:00.000Z,
        2023-07-04T05:00:00.000Z,
        2023-07-05T05:00:00.000Z,
        2023-07-06T05:00:00.000Z,
        2023-07-07T05:00:00.000Z,
        2023-07-08T05:00:00.000Z,
        2023-07-09T05:00:00.000Z,
        2023-07-10T05:00:00.000Z,
        2023-07-11T05:00:00.000Z,
        2023-07-12T05:00:00.000Z,
        2023-07-13T05:00:00.000Z,
        2023-07-14T05:00:00.000Z,
        2023-07-15T05:00:00.000Z,
        2023-07-16T05:00:00.000Z,
        2023-07-17T05:00:00.000Z,
        2023-07-18T05:00:00.000Z,
        2023-07-19T05:00:00.000Z,
        2023-07-20T05:00:00.000Z,
        2023-07-21T05:00:00.000Z,
        2023-07-22T05:00:00.000Z,
        2023-07-23T05:00:00.000Z,
        2023-07-24T05:00:00.000Z,
        2023-07-25T05:00:00.000Z,
        2023-07-26T05:00:00.000Z,
        2023-07-27T05:00:00.000Z,
        2023-07-28T05:00:00.000Z,
        2023-07-29T05:00:00.000Z,
        2023-07-30T05:00:00.000Z,
        2023-07-31T05:00:00.000Z,
        2023-08-01T05:00:00.000Z,
        2023-08-02T05:00:00.000Z,
        2023-08-03T05:00:00.000Z,
        2023-08-04T05:00:00.000Z,
        2023-08-05T05:00:00.000Z,
      ]
    `);
  });
});
