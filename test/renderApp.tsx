import { render, screen } from '@testing-library/react';

/** Renders the examples into an application for easier testing. */
export function renderApp(example: JSX.Element) {
  const renderResult = render(<div role="application">{example}</div>);
  const app = screen.getByRole('application');
  return { app, dayPicker: app.firstChild, renderResult };
}
