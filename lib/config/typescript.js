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
        '@typescript-eslint/no-unused-vars': [
          'warn', // Warning used to align with @typescript-eslint/recommended
          { argsIgnorePattern: '^_' }, // Pattern per Typescript spec: https://github.com/microsoft/TypeScript/issues/9458
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    },
  ],
};
