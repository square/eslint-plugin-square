/* eslint-env node */

'use strict';

module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
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
        'filenames/match-exported': ['error', 'pascal'],
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
      },
    },
    {
      files: ['src/setupTests.*'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
};
