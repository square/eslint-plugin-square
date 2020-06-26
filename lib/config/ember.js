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

    // Ember Octane rules:
    'ember/classic-decorator-hooks': 'error',
    'ember/classic-decorator-no-classic-methods': 'error',

    // Optional Ember rules:
    'ember/no-empty-attrs': 'error',
    'ember/no-proxies': 'error',
    'ember/no-replace-test-comments': 'error',
    'ember/no-test-this-render': 'error',
    'ember/no-unnecessary-service-injection-argument': 'error',
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
  ],
};
