/* eslint-env node */

'use strict';

const filenames = require('../utils/filenames');

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
