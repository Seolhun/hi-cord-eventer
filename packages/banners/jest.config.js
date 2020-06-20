const { defaults } = require('jest-config');
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      isolatedModules: true,
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts?(x)$/,
        warnOnly: true,
      },
    },
  },
  transformIgnorePatterns: ['./node_modules'],
  testMatch: ['<rootDir>/test/**/*.(test|spec).ts?(x)'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'jsx'],
};
