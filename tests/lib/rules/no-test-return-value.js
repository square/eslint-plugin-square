'use strict';

const rule = require('../../../lib/rules/no-test-return-value');
const RuleTester = require('eslint').RuleTester;

const { DEFAULT_TEST_HOOKS } = rule;

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
});

ruleTester.run('no-test-return-value', rule, {
  valid: [
    {
      filename: TEST_FILE_NAME,
      code: 'function hello() { return true; }',
    },
    {
      filename: TEST_FILE_NAME,
      code: 'describe(function() { 1; })',
    },
    {
      filename: TEST_FILE_NAME,
      code: 'describe(function() { return; })',
    },
    {
      filename: TEST_FILE_NAME,
      code: `
        foo(function() {
          bar('test');
          return 1;
        })`,
    },
    {
      filename: NON_TEST_FILE_NAME,
      code: 'describe(function() { return true; })',
    },
    {
      filename: TEST_FILE_NAME,
      code: 'describe.foo(function() { return true; })',
    },
    {
      filename: TEST_FILE_NAME,
      code: 'foo.describe(function() { return true; })',
    },
  ],
  invalid: [
    ...DEFAULT_TEST_HOOKS.map((testHook) => ({
      code: `${testHook}(function() { return 1; })`,
      filename: TEST_FILE_NAME,
      output: null,
      errors: [
        {
          messageId: 'error',
          type: 'ReturnStatement',
          suggestions: [
            {
              messageId: 'suggest',
              output: `${testHook}(function() { 1; })`,
            },
          ],
        },
      ],
    })),
    {
      filename: TEST_FILE_NAME,
      code: `
        testHook(function(condition) {
          return condition ? 1 : 2;
        })`,
      output: null,
      options: [{ testHooks: ['testHook'] }],
      errors: [
        {
          messageId: 'error',
          type: 'ReturnStatement',
          suggestions: [
            {
              messageId: 'suggest',
              output: `
        testHook(function(condition) {
          condition ? 1 : 2;
        })`,
            },
          ],
        },
      ],
    },
  ],
});
