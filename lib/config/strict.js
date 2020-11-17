'use strict';

module.exports = {
  extends: [require.resolve('./base')],
  plugins: ['square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',
    'sort-keys': ['error', 'asc', { natural: true }],

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
    'square/use-call-count-test-assert': 'error',
  },
};
