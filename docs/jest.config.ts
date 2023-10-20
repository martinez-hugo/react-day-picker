import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest'
  },
  rootDir: './examples',
  testEnvironment: 'jsdom',
  coverageReporters: ['lcov', 'text', 'clover'],
  setupFilesAfterEnv: ['react-day-picker/test/setup.ts']
};

export default config;
