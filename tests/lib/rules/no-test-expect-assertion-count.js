'use strict';

const rule = require('../../../lib/rules/no-test-expect-assertion-count');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE } = rule;

const ruleTester = new RuleTester();

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

ruleTester.run('no-test-expect-assertion-count', rule, {
  valid: [
    { filename: TEST_FILE_NAME, code: 'expect.otherFunction(5);' },
    { filename: TEST_FILE_NAME, code: 'OtherClass.expect(5);' },
    { filename: TEST_FILE_NAME, code: 'myFunction(5);' },
    { filename: TEST_FILE_NAME, code: "expect('Some string');" },
    { filename: TEST_FILE_NAME, code: "expect(5, 'Some string');" },
    { filename: TEST_FILE_NAME, code: 'expect(0);' },
    { filename: TEST_FILE_NAME, code: 'expect();' },
    { filename: TEST_FILE_NAME, code: 'expect(5).to.eql(5);' },
    { filename: TEST_FILE_NAME, code: 'assert.expect(0);' },

    { filename: NON_TEST_FILE_NAME, code: 'expect(5);' },
  ],
  invalid: [
    {
      code: 'expect(5);',
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
      filename: TEST_FILE_NAME,
    },
    {
      code:
        "test('my test', function(assert) { expect(1); assert.ok(true); });",
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
      filename: TEST_FILE_NAME,
    },
    {
      code: 'assert.expect(5);',
      output: null,
      errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
      filename: TEST_FILE_NAME,
    },
  ],
});
