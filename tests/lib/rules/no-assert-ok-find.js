'use strict';

const rule = require('../../../lib/rules/no-assert-ok-find');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE } = rule;

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
    },
    {
      code: "assert.dom('.class').exists();",
      filename: TEST_FILE_NAME,
    },
    {
      code: "assert.otherFunction(find('.class'));",
      filename: TEST_FILE_NAME,
    },
    {
      code: "otherClass.ok(find('.class'));",
      filename: TEST_FILE_NAME,
    },
    {
      code: "assert.ok(find('.class'));",
      filename: NON_TEST_FILE_NAME,
    },
  ],
  invalid: [
    {
      code: "assert.ok(find('.class'));",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "assert.ok(find('.class'), 'it exists');",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "assert.ok(findButton('Button Text'));",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "assert.ok(findButton('Button Text'), 'it exists');",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "assert.ok(findLink('Link Text'));",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      code: "assert.ok(findLink('Link Text'), 'it exists');",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
  ],
});
