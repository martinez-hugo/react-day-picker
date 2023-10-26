/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormatOptions } from '../types/FormatOptions';

/** Return the default ARIA label for next month button. */
export function labelNext(month: Date | undefined, options?: FormatOptions) {
  return 'Go to the Next Month';
}
