'use strict';

// This configuration is intended for use in TypeScript projects.
// Any TypeScript config we can automatically apply for TypeScript files should be done in the `base` config override instead.
// @typescript-eslint related config must stay in this separate config as moving it to `base` would require a package.json dependency on typescript.

module.exports = {
  extends: [require.resolve('./base')],
  plugins: ['square'],
  rules: {},
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/issues/15#issuecomment-458224762
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn', // Warning used to align with @typescript-eslint/recommended

          // Pattern per Typescript spec: https://github.com/microsoft/TypeScript/issues/9458
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-useless-constructor': 'error',
      },
    },
  ],
};
