'use strict';

/* eslint-env node */

const path = require('node:path');
const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-missing-tests');

const ruleTester = new RuleTester();

const RULES_TESTS_PATH = __dirname;
const RULES_LIB_PATH = path.normalize(
  path.join(__dirname, '..', '..', '..', 'lib', 'rules'),
);
const RULE_FILE = path.join(RULES_LIB_PATH, 'no-missing-tests.js');
const RANDOM_FILE = path.normalize(
  path.join(__dirname, '..', '..', '..', 'lib', 'index.js'),
);

ruleTester.run('no-missing-tests', rule, {
  valid: [
    {
      filename: RULE_FILE, // This file has a corresponding test file.
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
    },
    {
      filename: RULE_FILE, // This file matches multiple entries in options
      code: 'var x = 123;',
      options: [
        [
          // Consider a folder structure like
          //   lib/
          //     widget/
          //     widgets/
          //   test/
          //     widget/
          //     widgets/
          // with options configured for both pairs of folders. They will both
          // match, but if our file is in `lib/widgets`, we won't find a test
          // in the `test/widget` folder. We still want to pass the file if
          // if has a test in `test/widgets` folder - any one option matching is enough.
          {
            // this option's filePath will match, but there will be
            // no test at the test path. If this were the only option,
            // the rule would fail, but because the second option does
            // have a test, we still pass this case.
            filePath: RULES_LIB_PATH.slice(0, -1),
            testPaths: [RULES_TESTS_PATH.slice(0, -1)],
            hasTestSuffix: false,
          },
          {
            // this option's filePath matches, and there is a test
            // at the test path.
            filePath: RULES_LIB_PATH,
            testPaths: [RULES_TESTS_PATH],
            hasTestSuffix: false,
          },
        ],
      ],
    },
    {
      filename: RANDOM_FILE, // This file is not covered by the rule configuration and should be ignored.
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
    },
  ],
  invalid: [
    {
      filename: RULE_FILE,
      code: 'var x = 123;',
      output: null,
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [
              path.normalize(path.join(RULES_TESTS_PATH, '..', '..')),
            ], // This is intentionally incorrect to cause the rule to think the test is missing.
            hasTestSuffix: false,
          },
        ],
      ],
      errors: [{ messageId: 'error', line: 1, column: 1, type: 'Program' }],
    },
    {
      filename: RULE_FILE,
      code: 'var x = 123;',
      output: null,
      options: [
        [
          {
            filePath: RULES_LIB_PATH,
            testPaths: [RULES_TESTS_PATH],
            hasTestSuffix: true, // This is intentionally incorrect to cause the rule to think the test is missing.
          },
        ],
      ],
      errors: [{ messageId: 'error', line: 1, column: 1, type: 'Program' }],
    },
  ],
});
