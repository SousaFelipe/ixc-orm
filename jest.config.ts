import type {Config} from 'jest';


const config: Config = {

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },

  coverageReporters: [
    'json'
  ],

  setupFiles: [
    "dotenv/config"
  ],

  setupFilesAfterEnv: [
    './tests/jest.setup.ts'
  ],

  testMatch: [
    '<rootDir>/tests/**/*.test.ts'
  ]
};


export default config;
