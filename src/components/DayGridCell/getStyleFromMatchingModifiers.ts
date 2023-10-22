import { Styles } from '../../types';
import { MatchingModifiers, ModifiersStyles } from '../../types/modifiers';

export function getStyleFromMatchingModifiers(
  matchingModifiers: MatchingModifiers,
  modifiersStyles: Partial<ModifiersStyles>,
  styles: Styles
) {
  let style: React.CSSProperties = { ...styles.day };
  Object.entries(matchingModifiers)
    .filter(([, active]) => active === true)
    .forEach(([modifier]) => {
      style = {
        ...style,
        ...modifiersStyles?.[modifier]
      };
    });
  return style;
}
