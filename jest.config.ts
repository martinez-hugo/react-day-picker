import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  roots: ['./src'],
  moduleNameMapper: {
    '^test/(.*)': ['<rootDir>/test/$1'],
    '^labels(.*)': ['<rootDir>/src/labels$1'],
    '^formatters(.*)': ['<rootDir>/src/formatters$1'],
    '^components(.*)': ['<rootDir>/src/components$1'],
    '^contexts(.*)': ['<rootDir>/src/contexts$1'],
    '^hooks(.*)': ['<rootDir>/src/hooks$1'],
    '^types(.*)': ['<rootDir>/src/types$1']
  },
  testEnvironment: 'jsdom',
  coverageReporters: ['lcov', 'text', 'clover'],
  setupFilesAfterEnv: ['./test/setup.ts']
};

export default config;
