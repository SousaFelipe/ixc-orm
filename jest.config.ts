import type { Config } from 'jest';


const config: Config = {
  preset: 'ts-jest',

  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  collectCoverageFrom: [
    '**/src/**/*.(t|j)s'
  ],

  setupFiles: [
    'dotenv/config'
  ],

  setupFilesAfterEnv: [
    './tests/jest.setup.ts'
  ],

  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ]
};


export default config;
