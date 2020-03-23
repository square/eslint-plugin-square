'use strict';

// This configuration is intended for use in Ember applications.

const ASYNC_EMBER_TEST_HELPERS = require('../utils/async-ember-test-helpers');

module.exports = {
  extends: [require.resolve('./base'), 'plugin:ember/recommended'],
  plugins: ['ember', 'filenames', 'square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',

    // Optional Ember rules:
    'ember/classic-decorator-hooks': 'error',
    'ember/classic-decorator-no-classic-methods': 'error',
    'ember/no-empty-attrs': 'error',
    'ember/no-get': 'error',
    'ember/no-get-with-default': 'error',
    'ember/no-incorrect-computed-macros': 'error',
    'ember/no-invalid-dependent-keys': 'error',
    'ember/no-jquery': 'error',
    'ember/no-mixins': 'error',
    'ember/no-legacy-test-waiters': 'error',
    'ember/no-pause-test': 'error',
    'ember/no-private-routing-service': 'error',
    'ember/no-proxies': 'error',
    'ember/no-replace-test-comments': 'error',
    'ember/no-test-and-then': 'error',
    'ember/no-test-import-export': 'error',
    'ember/no-test-module-for': 'error',
    'ember/no-unnecessary-service-injection-argument': 'error',
    'ember/require-computed-macros': 'error',
    'ember/require-computed-property-dependencies': 'error',
    'ember/route-path-style': 'error',

    'filenames/match-regex': ['error', '^.?[a-z0-9-]+(.d)?$'], // Kebab-case.

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
