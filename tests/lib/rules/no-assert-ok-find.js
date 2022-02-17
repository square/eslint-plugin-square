'use strict';

const rule = require('../../../lib/rules/no-assert-ok-find');
const RuleTester = require('eslint').RuleTester;

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

ruleTester.run('no-assert-ok-find', rule, {
  valid: [
    {
      filename: TEST_FILE_NAME,
      code: "exists('.class');",
      globals: { find: true },
    },
    {
      filename: TEST_FILE_NAME,
      code: "assert.dom('.class').exists();",
      globals: { find: true },
    },
    {
      filename: TEST_FILE_NAME,
      code: "assert.otherFunction(find('.class'));",
      globals: { find: true },
    },
    {
      filename: TEST_FILE_NAME,
      code: "otherClass.ok(find('.class'));",
      globals: { find: true },
    },
    {
      filename: NON_TEST_FILE_NAME,
      code: "assert.ok(find('.class'));",
      globals: { find: true },
    },

    // Not the global
    {
      filename: NON_TEST_FILE_NAME,
      code: "import { find } from '@ember/test-helpers'; assert.ok(find('.class'));",
    },
  ],
  invalid: [
    {
      filename: TEST_FILE_NAME,
      code: "assert.ok(find('.class'));",
      output: null,
      globals: { find: true },
      errors: [
        {
          messageId: 'error',
          type: 'CallExpression',
          suggestions: [
            {
              messageId: 'changeToAssertEqualFindLength',
              output: "assert.equal(find('.class').length, 1);",
            },
          ],
        },
      ],
    },
    {
      filename: TEST_FILE_NAME,
      code: "assert.ok(find('.class'), 'it exists');",
      output: null,
      globals: { find: true },
      errors: [
        {
          messageId: 'error',
          type: 'CallExpression',
          suggestions: [
            {
              messageId: 'changeToAssertEqualFindLength',
              output: "assert.equal(find('.class').length, 1, 'it exists');",
            },
          ],
        },
      ],
    },
  ],
});
