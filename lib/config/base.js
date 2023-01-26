'use strict';

// This configuration is intended for use with JavaScript applications.

module.exports = {
  reportUnusedDisableDirectives: true, // Warn on unused disable directives: https://eslint.org/docs/latest/user-guide/configuring/rules#report-unused-eslint-disable-comments
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  env: {
    es2021: true,
  },
  plugins: [
    'es',
    'eslint-comments',
    'filenames',
    'import',
    'prettier',
    'square',
    'unicorn',
  ],
  rules: {
    // Optional eslint rules:
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    complexity: 'error',
    'consistent-return': 'error',
    curly: 'error',
    'default-case': 'error',
    eqeqeq: 'error',
    'func-style': ['error', 'declaration'],
    'new-parens': 'error',
    'no-async-promise-executor': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-implicit-coercion': 'error',
    'no-implied-eval': 'error',
    'no-lone-blocks': 'error',
    'no-multiple-empty-lines': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': ['error', { props: true }],
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-use-before-define': ['error', 'nofunc'],
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-escape': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-with': 'error',
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-numeric-literals': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    quotes: [
      'error',
      'single', // Must match quote style enforced by prettier.
      // Disallow unnecessary template literals.
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    radix: 'error',
    'require-atomic-updates': 'error',
    'require-await': 'error',
    'spaced-comment': ['error', 'always', { markers: ['*', '!'] }],
    'sort-vars': 'error',
    yoda: 'error',

    // es:
    'es/no-regexp-lookbehind-assertions': 'error',

    // eslint-comments:
    'eslint-comments/no-unused-disable': 'error',

    // Filenames:
    'filenames/match-exported': ['error', 'kebab'],

    // Prettier:
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],

    // import rules:
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'error',
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-cycle': 'error',
    'import/no-deprecated': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-unassigned-import': 'error',
    'import/no-unused-modules': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-webpack-loader-syntax': 'error',

    // Unicorn rules:
    'unicorn/catch-error-name': 'off', // We use many different valid names for our try/catch errors.
    'unicorn/consistent-function-scoping': 'off', // We have a lot of functions in different scopes.
    'unicorn/import-style': 'off', // Too noisy, not useful enough.
    'unicorn/no-array-callback-reference': 'off', // We use this a lot.
    'unicorn/no-array-for-each': 'off', // We use a lot of `forEach` and this may be too opinionated.
    'unicorn/no-array-reduce': 'off', // We use a lot of `reduce`.
    'unicorn/no-lonely-if': 'off', // Sometimes the code is clearer with the lonely if.
    'unicorn/no-null': 'off', // We use a lot of `null`.
    'unicorn/no-useless-undefined': 'off', // We use a lot of `return undefined` to satisfy the `consistent-return` rule.
    'unicorn/numeric-separators-style': 'off', // Too noisy for now.
    'unicorn/prefer-add-event-listener': 'off', // The autofixer can be unsafe.
    'unicorn/prefer-dom-node-append': 'off', // This incorrectly autofixes `append()` on non-DOM-nodes.
    'unicorn/prefer-dom-node-remove': 'off', // This incorrectly autofixes `remove()` on non-DOM-nodes.
    'unicorn/prefer-dom-node-text-content': 'off', // The autofixer can be unsafe.
    'unicorn/prefer-module': 'off', // Not ready for this yet.
    'unicorn/prefer-node-protocol': 'off', // TODO: Enable once we drop support for Node 14 entirely.
    'unicorn/prefer-prototype-methods': 'off', // Too noisy for now.
    'unicorn/prefer-query-selector': 'off', // The autofixer can be unsafe.
    'unicorn/prefer-switch': 'off', // Too aggressive for now.
    'unicorn/prefer-ternary': 'off', // Too many violations.
    'unicorn/prevent-abbreviations': 'off', // Probably not a good fit for us as we use many abbreviations.
  },
  overrides: [
    {
      // Tweaks for TypeScript files that we can apply for users even if they don't happen to use our `typescript` config.
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      extends: ['plugin:import/typescript'],
      rules: {
        // Last parameter allows for exporting from a .d.ts file
        'filenames/match-exported': ['error', 'kebab', '\\.d$'],
      },
    },
  ],
};
