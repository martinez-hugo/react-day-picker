import { ByRoleOptions, screen } from '@testing-library/react';

export function previousButton() {
  return screen.getByRole('button', {
    name: 'Go to the Previous Month'
  });
}

export function nextButton() {
  return screen.getByRole('button', {
    name: 'Go to the Next Month'
  });
}

export function grid(name?: ByRoleOptions['name']) {
  return screen.getByRole('grid', name ? { name } : undefined);
}

export function gridcell(date: Date) {
  return screen.getByRole('gridcell', { name: String(date.getDate()) });
}

export function yearDropdown() {
  return screen.getByRole('combobox', { name: 'Year:' });
}

export function monthDropdown() {
  return screen.getByRole('combobox', { name: 'Month:' });
}
