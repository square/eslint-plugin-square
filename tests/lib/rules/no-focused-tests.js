'use strict';

const rule = require('../../../lib/rules/no-focused-tests');
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

ruleTester.run('no-focused-tests', rule, {
  valid: [
    {
      code: 'describe()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'context()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'it()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'describe.skip()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'context.skip()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'it.skip()',
      filename: TEST_FILE_NAME,
    },
    {
      code: "describe['skip']()",
      filename: TEST_FILE_NAME,
    },
    {
      code: "context['skip']()",
      filename: TEST_FILE_NAME,
    },
    {
      code: "it['skip']()",
      filename: TEST_FILE_NAME,
    },
    {
      code: 'random.only()',
      filename: TEST_FILE_NAME,
    },
    {
      code: 'describe.only()',
      filename: NON_TEST_FILE_NAME,
    },
  ],
  invalid: [
    {
      code: 'describe.only()',
      filename: TEST_FILE_NAME,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'Identifier',
          column: 10,
          endColumn: 14,
        },
      ],
    },
    {
      code: 'context.only()',
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE }],
    },
    {
      code: 'it.only()',
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE }],
    },
    {
      code: "describe['only']()",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'Literal',
          column: 10,
          endColumn: 16,
        },
      ],
    },
    {
      code: "context['only']()",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE }],
    },
    {
      code: "it['only']()",
      filename: TEST_FILE_NAME,
      output: null,
      errors: [{ message: ERROR_MESSAGE }],
    },
  ],
});
