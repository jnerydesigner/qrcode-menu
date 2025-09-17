import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@presenters/(.*)$': '<rootDir>/src/presenters/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
};

export default config;
