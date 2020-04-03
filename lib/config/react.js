/* eslint-env node */

'use strict';

const filenames = require('../utils/filenames');

module.exports = {
  extends: [require.resolve('./base'), 'plugin:react/recommended'],
  plugins: ['filenames'],
  rules: {
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'import/extensions': 'off',
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],
    'sort-vars': 'error',
  },
  overrides: [
    {
      files: ['src/components/**/*'],
      rules: {
        'filenames/match-regex': ['error', filenames.regex.pascal],
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
