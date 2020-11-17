'use strict';

// This configuration is intended for use in Ember applications.

const ASYNC_EMBER_TEST_HELPERS = require('../utils/async-ember-test-helpers');

module.exports = {
  extends: [
    require.resolve('./base'),
    'plugin:ember/recommended',
    'plugin:qunit/recommended',
    'plugin:qunit/two',
  ],
  plugins: ['ember', 'qunit', 'square'],
  rules: {
    // Optional eslint rules:
    'no-console': 'error',

    // Recommended Ember rules with custom options:
    'ember/no-get': ['error', { useOptionalChaining: true }],

    // Ember Octane rules:
    'ember/classic-decorator-hooks': 'error',
    'ember/classic-decorator-no-classic-methods': 'error',

    // Optional Ember rules:
    'ember/no-empty-attrs': 'error',
    'ember/no-proxies': 'error',
    'ember/no-replace-test-comments': 'error',
    'ember/no-unnecessary-service-injection-argument': 'error',
    'ember/route-path-style': 'error',

    // Upcoming eslint-plugin-ember v10 additions (TODO: remove this section after this major version is released): https://github.com/ember-cli/eslint-plugin-ember/issues/960
    'ember/no-empty-glimmer-component-classes': 'error',
    'ember/no-get-with-default': [
      'error',
      { catchSafeObjects: true, catchUnsafeObjects: true },
    ],
    'ember/no-settled-after-test-helper': 'error',
    'ember/no-shadow-route-definition': 'error',
    'ember/no-side-effects': ['error', { checkPlainGetters: true }],
    'ember/no-string-prototype-extensions': 'error',
    'ember/no-test-support-import': 'error',
    'ember/no-try-invoke': 'error',
    'ember/require-super-in-init': [
      'error',
      { checkInitOnly: false, checkNativeClasses: true },
    ],
    'ember/require-valid-css-selector-in-test-helpers': 'error',

    // QUnit rules:
    'qunit/no-arrow-tests': 'error',
    'qunit/no-compare-relation-boolean': ['error', { fixToNotOk: true }],
    'qunit/no-global-assertions': 'off', // This incorrectly flags imported functions (including computed property macros like `equal`): https://github.com/platinumazure/eslint-plugin-qunit/issues/75
    'qunit/no-global-module-test': 'off', // This incorrectly flags imported functions: https://github.com/platinumazure/eslint-plugin-qunit/issues/75
    'qunit/no-global-stop-start': 'off', // This incorrectly flags imported functions: https://github.com/platinumazure/eslint-plugin-qunit/issues/75
    'qunit/no-negated-ok': ['error', { fixToNotOk: true }],
    'qunit/no-nested-tests': 'error',
    'qunit/require-expect': ['error', 'never-except-zero'],

    // Our custom rules:
    'square/no-assert-ok-find': 'error',
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
