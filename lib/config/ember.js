'use strict';

// This configuration is intended for use in Ember applications.

const ASYNC_EMBER_TEST_HELPERS = require('../utils/async-ember-test-helpers');

module.exports = {
  extends: [require.resolve('./base'), 'plugin:ember/recommended'],
  plugins: ['ember', 'square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',

    // Recommended Ember rules with custom options:
    'ember/no-private-routing-service': [
      'error',
      { catchRouterMicrolib: true },
    ],
    'ember/no-get': ['error', { useOptionalChaining: true }],

    // Ember Octane rules:
    'ember/classic-decorator-hooks': 'error',
    'ember/classic-decorator-no-classic-methods': 'error',

    // Optional Ember rules:
    'ember/no-assignment-of-untracked-properties-used-in-tracking-contexts':
      'error',
    'ember/no-empty-attrs': 'error',
    'ember/no-invalid-test-waiters': 'error',
    'ember/no-proxies': 'error',
    'ember/no-replace-test-comments': 'error',
    'ember/no-test-this-render': 'error',
    'ember/no-unnecessary-service-injection-argument': 'error',
    'ember/prefer-ember-test-helpers': 'error',
    'ember/route-path-style': 'error',

    // Our custom rules:
    'square/no-assert-ok-find': 'error',
    'square/no-focused-tests': 'error',
    'square/no-lazy-arrow-functions': 'error',
    'square/no-test-expect-assertion-count': 'error',
    'square/no-test-return-value': 'error',
    'square/no-translation-key-interpolation': 'error',
    'square/use-call-count-test-assert': 'error',
    'square/use-ember-find': 'error',
  },
  overrides: [
    {
      files: ['router.{js,ts}'],
      rules: {
        'array-callback-return': 'off', // This trips on `Router.map(...)` in Ember routers so just disable it for that file.
      },
    },
    {
      // Test files:
      files: ['addon-test-support/**/*.{js,ts}', 'tests/**/*.{js,ts}'],
      rules: {
        'square/require-await-function': [
          'error',
          { functions: ASYNC_EMBER_TEST_HELPERS },
        ],
      },
    },
    {
      files: [
        '**/{app,addon}/{components,controllers,routes,services}/**/*.{js,ts}',
      ],
      rules: {
        /**
         * Turn this rule off for these file types because it does not support Ember's blueprint generator naming convention.
         *
         * Example:
         *
         * Running this command:
         *     ember generate component hello-world
         * Produces a file with:
         *     export default class HelloWorldComponent extends Component {}
         * But this rule expects the class to be named "HelloWorld".
         */
        'filenames/match-exported': 'off',
      },
    },
  ],
};
