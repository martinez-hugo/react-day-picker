import React from 'react';

import { user } from '../../test/user';
import Example from './testcase-1567';
import { app } from './testcase-1567.test';

beforeEach(() => {
  const render = renderExampleApp(<Example />);
  app = render.app;
  await user.tab();
  await user.tab();
  await user.tab();
  await user.tab();
});
