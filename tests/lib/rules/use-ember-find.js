'use strict';

const rule = require('../../../lib/rules/use-ember-find');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE } = rule;

const TEST_FILE_NAME = 'some-test.js';

const ruleTester = new RuleTester();
ruleTester.run('use-ember-find', rule, {
  valid: [
    {
      filename: TEST_FILE_NAME,
      code: "find('.foo');",
    },

    // Using `$`:
    {
      filename: TEST_FILE_NAME,
      code: '$(element);',
    },
    {
      filename: TEST_FILE_NAME,
      code: "$('.foo', '.bar');",
    },
    {
      filename: TEST_FILE_NAME,
      code: "OtherClass.$('.foo');",
    },
    {
      filename: TEST_FILE_NAME,
      code: "$.otherFunction('.foo');",
    },
    {
      filename: 'not-a-test-file.js',
      code: "$('.foo');",
    },

    // Using `jQuery`:
    {
      filename: TEST_FILE_NAME,
      code: 'jQuery(element);',
    },
    {
      filename: TEST_FILE_NAME,
      code: "jQuery('.foo', '.bar');",
    },
    {
      filename: TEST_FILE_NAME,
      code: "OtherClass.jQuery('.foo');",
    },
    {
      filename: TEST_FILE_NAME,
      code: "jQuery.otherFunction('.foo');",
    },
    {
      filename: 'not-a-test-file.js',
      code: "jQuery('.foo');",
    },
  ],
  invalid: [
    // Using `$`:
    {
      filename: TEST_FILE_NAME,
      code: "$('.some-selector');",
      output: "find('.some-selector', 'body');",
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      filename: TEST_FILE_NAME,
      code: "($)('.some-selector');",
      output: "(find)('.some-selector', 'body');",
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      filename: TEST_FILE_NAME,
      code: '$(`.some-${selector}`);', // eslint-disable-line no-template-curly-in-string
      output: "find(`.some-${selector}`, 'body');", // eslint-disable-line no-template-curly-in-string
      parserOptions: { ecmaVersion: 2020 },
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },

    // Using `jQuery`:
    {
      filename: TEST_FILE_NAME,
      code: "jQuery('.some-selector');",
      output: "find('.some-selector', 'body');",
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      filename: TEST_FILE_NAME,
      code: "(jQuery)('.some-selector');",
      output: "(find)('.some-selector', 'body');",
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
    {
      filename: TEST_FILE_NAME,
      code: 'jQuery(`.some-${selector}`);', // eslint-disable-line no-template-curly-in-string
      output: "find(`.some-${selector}`, 'body');", // eslint-disable-line no-template-curly-in-string
      parserOptions: { ecmaVersion: 2020 },
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
    },
  ],
});
