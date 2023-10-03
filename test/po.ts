import { ByRoleOptions, screen } from '@testing-library/react';

export class PageObjects {
  public get previousButton() {
    return screen.getByRole('button', {
      name: 'Go to previous month'
    });
  }
  public get nextButton() {
    return screen.getByRole('button', {
      name: 'Go to next month'
    });
  }
  public grid(name?: ByRoleOptions['name']) {
    return screen.getByRole('grid', name ? { name } : undefined);
  }
}

export const po = new PageObjects();
