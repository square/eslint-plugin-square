'use strict';

// This configuration is intended for use in TypeScript projects.

module.exports = {
  extends: [require.resolve('./base')],
  plugins: ['square'],
  rules: {},
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:import/typescript',
      ],
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
