/* eslint-env node */

'use strict';

module.exports = {
  extends: [require.resolve('./base'), 'plugin:react/recommended'],
  plugins: ['filenames'],
  rules: {
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],
    'sort-vars': 'error',

    // Require kebab-case file names
    'filenames/match-regex': ['error', '^.?[a-z0-9-]+(.d)?$'],
  },
  overrides: [
    {
      files: ['src/components/**/*'],
      rules: {
        'filenames/match-regex': ['error', '^([A-Z][a-z.]+)+(.[tj]sx?)?$'],
      },
    },
  ],
};
