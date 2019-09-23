module.exports = {
  // roots: ['<rootDir>/packages/localize-components/src'],
  rootDir: '.',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/*.(test|spec).ts?(x)',
  ],
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx', 'json',
  ],
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/_config_/',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts?(x)$/,
        warnOnly: true,
      },
    },
  },
};
