import type { Config } from 'jest';

import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './src',
})
 
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    // ...
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'reports',
        outputName: 'sonar-report.xml',
      },
    ],
  ],

}
 
export default createJestConfig(config)
