# React DayPicker

<a href="https://www.npmjs.com/package/react-day-picker">
  <img src="https://img.shields.io/npm/v/react-day-picker.svg?style=flat-square" alt="npm version"/>
</a> <a href="http://npm-stat.com/charts.html?package=react-day-picker">
  <img src="https://img.shields.io/npm/dm/react-day-picker.svg?style=flat-square" alt="npm downloads"/>
</a> <a href="https://github.com/gpbl/react-day-picker/stargazers">
<img src="https://img.shields.io/github/stars/gpbl/react-day-picker?style=flat-square" alt="stars"/>
</a> <a href="https://github.com/sponsors/gpbl">
  <img src="https://img.shields.io/github/sponsors/gpbl?style=flat-square" alt="sponsors"/>
</a>

[DayPicker](http://react-day-picker.js.org) is a customizable date picker component for [React](https://reactjs.org) that renders a calendar for selecting days.

See **[react-day-picker.js.org](http://react-day-picker.js.org)** for guides, examples and API reference.

<a href="http://react-day-picker.js.org">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcSet="https://user-images.githubusercontent.com/120693/188241991-19d0e8a1-230a-48c8-8477-3c90d4e36197.png"/>
    <source media="(prefers-color-scheme: light)" srcSet="https://user-images.githubusercontent.com/120693/188238076-311ec6d1-503d-4c21-8ffe-d89faa60e40f.png"/>
    <img alt="Shows a screenshot of the React DayPicker component in a browser’s window." width="900" />
  </picture>
</a>

## Main features

- ☀️ Select days, ranges or whatever
- 🧘‍♀️ Using [date-fns](http://date-fns.org) as date library
- 🌎 Localizable into any language
- ➡️ Keyboard navigation
- ♿️ [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) support
- 🤖 Written in TypeScript
- 🎨 Easy to style and customize
- 🗓 Support multiple calendars
- 📄 Easy to integrate input fields

## Getting started

### Install the dependencies

Add `react-day-picker` and [date-fns](https://date-fns.org) to your dependencies.

```sh npm2yarn
npm install react-day-picker date-fns
```

### Import DayPicker

When importing, include the DayPicker CSS in your component.

```tsx
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Example() {
  const [selected, setSelected] = React.useState<Date>();
  return <DayPicker mode="single" selected={selected} onSelect={setSelected} />;
}
```
