'use strict';

const rule = require('../../../lib/rules/no-lazy-arrow-functions');
const RuleTester = require('eslint').RuleTester;

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });
ruleTester.run('no-lazy-arrow-functions', rule, {
  valid: [
    { filename: TEST_FILE_NAME, code: "lazy('a', 'b')" },
    { filename: TEST_FILE_NAME, code: "lazy('a', function() {})" },
    {
      filename: TEST_FILE_NAME,
      code: "lazy('a', function() { return this.b })",
    },

    // Not the right function:
    { filename: TEST_FILE_NAME, code: "random('a', () => true)" },
    { filename: TEST_FILE_NAME, code: "random.lazy('a', () => true)" },
    { filename: TEST_FILE_NAME, code: "lazy.random('a', () => true)" },

    // Not a test file:
    { filename: NON_TEST_FILE_NAME, code: "lazy('a', () => true)" },
  ],
  invalid: [
    {
      code: "lazy('a', () => true)",
      filename: TEST_FILE_NAME,
      output: "lazy('a', true)",
      errors: [
        {
          message: "Use lazy('a', function() { … })",
          type: 'ArrowFunctionExpression',
        },
      ],
    },
    {
      code: "lazy('b', () => [])",
      filename: TEST_FILE_NAME,
      output: "lazy('b', function() { return []; })",
      errors: [
        {
          message: "Use lazy('b', function() { … })",
          type: 'ArrowFunctionExpression',
        },
      ],
    },
    {
      code: "lazy('a', () => { return this.b; })",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [
        {
          message:
            'Using `this` in an arrow function for a lazy callback will be undefined',
          type: 'ArrowFunctionExpression',
        },
      ],
    },
  ],
});
