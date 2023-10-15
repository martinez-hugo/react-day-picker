import React from 'react';

import { renderExampleApp } from '../../test/renderExampleApp';
import { freezeBeforeAll } from '../../test/utils';
import Example from './styling-css';

const today = new Date(2021, 10, 25);
freezeBeforeAll(today);

let app: HTMLElement;
beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
});

test('the caption should use the custom class name', () => {
  expect(app.getElementsByClassName('caption_aqua')[0]).toHaveTextContent(
    'November 2021'
  );
});
