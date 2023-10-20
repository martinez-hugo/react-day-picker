import { ClassNames } from '../../types';
import {
  CustomModifier,
  InternalModifier,
  MatchingModifiers,
  ModifiersClassNames
} from '../../types/modifiers';

export function getClassNameByMatchingModifiers(
  matchingModifiers: MatchingModifiers,
  modifiersClassNames: ModifiersClassNames,
  classNames: ClassNames
) {
  const modifierClassNames = Object.entries(matchingModifiers)
    .filter(([, active]) => active === true)
    .reduce((previousValue, [key]) => {
      if (modifiersClassNames[key]) {
        previousValue.push(modifiersClassNames[key as CustomModifier]);
      } else {
        previousValue.push(classNames[`day_${key as InternalModifier}`]);
      }
      return previousValue;
    }, [] as string[]);

  const className = [classNames.day, ...modifierClassNames].join(' ');
  return className;
}
