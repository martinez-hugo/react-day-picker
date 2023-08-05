---
id: "DayModifiers"
title: "Type alias: DayModifiers"
sidebar_label: "DayModifiers"
sidebar_position: 0
custom_edit_url: null
---

Ƭ **DayModifiers**: `Record`<[`CustomModifier`](/api/types/CustomModifier.md), `boolean`\> & `Record`<[`InternalModifier`](/api/enums/InternalModifier.md), `boolean`\>

The modifiers that are matching a day in the calendar. Use the useActiveModifiers hook to get the modifiers for a day.

```
const state: DayState = {
 selected: true,
 customModifier: true
}
```

#### Defined in

[src/types/modifiers.ts:40](https://github.com/gpbl/react-day-picker/blob/507320a5a/src/types/modifiers.ts#L40)
