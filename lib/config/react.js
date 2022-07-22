/* eslint-env node */

'use strict';

module.exports = {
  extends: [require.resolve('./base'), 'plugin:react/recommended'],
  plugins: ['filenames'],
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],

    'import/extensions': 'off',
  },
  overrides: [
    {
      files: ['src/components/**/*'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
    {
      files: ['src/setupTests.*'],
      rules: {
        'filenames/match-regex': 'off',
      },
    },
  ],
};
