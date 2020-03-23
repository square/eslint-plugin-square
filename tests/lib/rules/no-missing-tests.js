'use strict';

/* eslint-env node */

const { join, normalize } = require('path');
const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-missing-tests');

const { ERROR_MESSAGE } = rule;

const ruleTester = new RuleTester();

const RULES_TESTS_PATH = __dirname;
const RULES_LIB_PATH = normalize(
  join(__dirname, '..', '..', '..', 'lib', 'rules')
);
const RULE_FILE = join(RULES_LIB_PATH, 'no-missing-tests.js');
const RANDOM_FILE = normalize(
  join(__dirname, '..', '..', '..', 'lib', 'index.js')
);

ruleTester.run('no-missing-tests', rule, {
  valid: [
    {
      code: 'var x = 123;',
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [RULES_TESTS_PATH],
            hasTestSuffix: false,
          },
        ],
      ],
      filename: RULE_FILE, // This file has a corresponding test file.
    },
    {
      code: 'var x = 123;',
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [RULES_TESTS_PATH],
            hasTestSuffix: false,
          },
        ],
      ],
      filename: RANDOM_FILE, // This file is not covered by the rule configuration and should be ignored.
    },
  ],
  invalid: [
    {
      code: 'var x = 123;',
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [normalize(join(RULES_TESTS_PATH, '..', '..'))], // This is intentionally incorrect to cause the rule to think the test is missing.
            hasTestSuffix: false,
          },
        ],
      ],
      output: null,
      filename: RULE_FILE,
      errors: [{ message: ERROR_MESSAGE, line: 1, column: 1, type: 'Program' }],
    },
    {
      code: 'var x = 123;',
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [RULES_TESTS_PATH],
            hasTestSuffix: true, // This is intentionally incorrect to cause the rule to think the test is missing.
          },
        ],
      ],
      output: null,
      filename: RULE_FILE,
      errors: [{ message: ERROR_MESSAGE, line: 1, column: 1, type: 'Program' }],
    },
  ],
});
