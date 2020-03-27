'use strict';

// This configuration is intended for use in TypeScript projects.

module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: ['square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',
    'no-debugger': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],
    'sort-vars': 'error',

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
  ],
};
