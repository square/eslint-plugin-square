'use strict';

const rule = require('../../../lib/rules/use-call-count-test-assert');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE, ASSERT_PROPERTY_NAMES, STUB_PROPERTY_NAMES } = rule;

const TEST_FILE_NAME = 'some-test.js';
const NON_TEST_FILE_NAME = 'some-file.js';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
});

const VALID_HELPER_USAGES_1 = ASSERT_PROPERTY_NAMES.map(
  (assertPropertyName) => {
    return {
      code: `assert.${assertPropertyName}(myBool);`,
      filename: TEST_FILE_NAME,
    };
  }
);

const VALID_HELPER_USAGES_2 = STUB_PROPERTY_NAMES.map((stubPropertyName) => {
  return {
    code: `assert.equal(myStub.${stubPropertyName}, true);`,
    filename: TEST_FILE_NAME,
  };
});

const VALID_HELPER_USAGES_3 = STUB_PROPERTY_NAMES.map((stubPropertyName) => {
  return {
    code: `assert.equal(this.prop.myStub.${stubPropertyName}, true);`,
    filename: TEST_FILE_NAME,
  };
});

const VALID_HELPER_USAGES = [
  ...VALID_HELPER_USAGES_1,
  ...VALID_HELPER_USAGES_2,
  ...VALID_HELPER_USAGES_3,
  {
    code: 'assert.ok(myStub.calledOnce);',
    filename: NON_TEST_FILE_NAME,
  },

  // Not the right function calls:
  {
    code: 'assert.ok();',
    filename: TEST_FILE_NAME,
  },
  {
    code: 'assert.ok.random(myStub.calledOnce);',
    filename: TEST_FILE_NAME,
  },
  {
    code: 'random.assert.ok(myStub.calledOnce);',
    filename: TEST_FILE_NAME,
  },
  {
    code: 'random.ok(myStub.calledOnce);',
    filename: TEST_FILE_NAME,
  },
  {
    code: 'assert.random(myStub.calledOnce);',
    filename: TEST_FILE_NAME,
  },
];

const INVALID_HELPER_USAGES = flatten(
  ASSERT_PROPERTY_NAMES.map((assertPropertyName) => {
    return flatten(
      STUB_PROPERTY_NAMES.map((stubPropertyName) => {
        // Test case: basic.
        const ex1 = {
          code: `assert.${assertPropertyName}(myStub.${stubPropertyName});`,
          output: null,
          errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
          filename: TEST_FILE_NAME,
        };

        // Test case: with more complicated stub path.
        const ex2 = {
          code: `assert.${assertPropertyName}(this.prop.myStub.${stubPropertyName});`,
          output: null,
          errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
          filename: TEST_FILE_NAME,
        };

        // Test case: passing the optional message parameter.
        const ex3 = {
          code: `assert.${assertPropertyName}(myStub.${stubPropertyName}, 'is called the right number of times');`,
          output: null,
          errors: [{ message: ERROR_MESSAGE, type: 'CallExpression' }],
          filename: TEST_FILE_NAME,
        };

        const isAssertNotOkayCalled =
          assertPropertyName === 'notOk' && stubPropertyName === 'called';
        if (stubPropertyName !== 'called' || isAssertNotOkayCalled) {
          // Can't autofix this since we don't know the expected call count.

          const expectedCallCount = isAssertNotOkayCalled
            ? 0
            : STUB_PROPERTY_NAMES.indexOf(stubPropertyName);

          ex1.output = `assert.equal(myStub.callCount, ${expectedCallCount});`;
          ex2.output = `assert.equal(this.prop.myStub.callCount, ${expectedCallCount});`;
          ex3.output = `assert.equal(myStub.callCount, ${expectedCallCount}, 'is called the right number of times');`;
        }

        return [ex1, ex2, ex3];
      })
    );
  })
);

function flatten(array) {
  // JavaScript `Array.prototype.flat()` not available yet.
  return array.reduce((accumulator, value) => accumulator.concat(value));
}

ruleTester.run('use-call-count-test-assert', rule, {
  valid: VALID_HELPER_USAGES,
  invalid: INVALID_HELPER_USAGES,
});
