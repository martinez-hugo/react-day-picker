import React from 'react';

import { axe } from '../../test/axe';
import { renderExampleApp } from '../../test/renderExampleApp';
import Example from './container-attributes';

test('should not have AXE violations', async () => {
  const { app } = renderExampleApp(<Example />);
  expect(await axe(app)).toHaveNoViolations();
});

test('should have the specified id', () => {
  const { dayPicker } = renderExampleApp(<Example />);
  expect(dayPicker).toHaveAttribute('id', 'testId');
});

test('should have the data set attribute', () => {
  const { dayPicker } = renderExampleApp(<Example />);
  expect(dayPicker).toHaveAttribute('data-test', 'testData');
});
