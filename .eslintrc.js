module.exports = {
  env: {
    jest: true,
    browser: true,
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended'],
  plugins: ['@typescript-eslint', 'eslint-plugin', 'jest'],
  parser: '@typescript-eslint/parser',
  rules: {
    // TODO: Will be Removed
    'import/no-cycle': 0,
    'mouse-events-have-key-events': 0,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
    allowImportExportEverywhere: true,
  },
  settings: {
    'prettier/prettier': 'error',
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
