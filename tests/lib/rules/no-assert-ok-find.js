'use strict';

const rule = require('../../../lib/rules/no-assert-ok-find');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE, SUGGEST_MESSAGE } = rule;

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
});

ruleTester.run('no-assert-ok-find', rule, {
  valid: [
    {
      code: "exists('.class');",
      filename: TEST_FILE_NAME,
      globals: { find: true },
    },
    {
      code: "assert.dom('.class').exists();",
      filename: TEST_FILE_NAME,
      globals: { find: true },
    },
    {
      code: "assert.otherFunction(find('.class'));",
      filename: TEST_FILE_NAME,
      globals: { find: true },
    },
    {
      code: "otherClass.ok(find('.class'));",
      filename: TEST_FILE_NAME,
      globals: { find: true },
    },
    {
      code: "assert.ok(find('.class'));",
      filename: NON_TEST_FILE_NAME,
      globals: { find: true },
    },

    // Not the global
    {
      code: "import { find } from '@ember/test-helpers'; assert.ok(find('.class'));",
      filename: NON_TEST_FILE_NAME,
    },
  ],
  invalid: [
    {
      code: "assert.ok(find('.class'));",
      filename: TEST_FILE_NAME,
      globals: { find: true },
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'CallExpression',
          suggestions: [
            {
              desc: SUGGEST_MESSAGE,
              output: "assert.equal(find('.class').length, 1);",
            },
          ],
        },
      ],
    },
    {
      code: "assert.ok(find('.class'), 'it exists');",
      filename: TEST_FILE_NAME,
      globals: { find: true },
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'CallExpression',
          suggestions: [
            {
              desc: SUGGEST_MESSAGE,
              output: "assert.equal(find('.class').length, 1, 'it exists');",
            },
          ],
        },
      ],
    },
  ],
});
