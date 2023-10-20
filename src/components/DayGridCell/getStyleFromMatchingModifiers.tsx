import { Styles } from '../../types';
import {
  MatchingModifiers as MatchingModifiers,
  ModifiersStyles
} from '../../types/modifiers';

export function getStyleFromMatchingModifiers(
  matchingModifiers: MatchingModifiers,
  modifiersStyles: Partial<ModifiersStyles>,
  styles: Styles
) {
  let style: React.CSSProperties = { ...styles.day };
  Object.keys(matchingModifiers).forEach((modifier) => {
    style = {
      ...style,
      ...modifiersStyles?.[modifier]
    };
  });
  return style;
}
