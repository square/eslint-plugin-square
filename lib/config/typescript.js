'use strict';

// This configuration is intended for use in TypeScript projects.

const filenames = require('../utils/filenames');

module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: ['filenames', 'square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],

    'filenames/match-regex': ['error', filenames.regex.kebab],

    // import rules:
    'import/group-exports': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],

    // Our custom rules:
    'square/no-focused-tests': 'error',
    'square/use-call-count-test-assert': 'error',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.ts'],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/issues/15#issuecomment-458224762
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    },
  ],
};
