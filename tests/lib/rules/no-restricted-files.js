const rule = require('../../../lib/rules/no-restricted-files');
const RuleTester = require('eslint').RuleTester;

const { DEFAULT_ERROR_MESSAGE } = rule;

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
});

const REGEXP_DISALLOW_UNSCOPED_COMPONENTS = 'app/components/[^/]+$';

const FILEPATH_UNSCOPED_COMPONENT = 'app/components/my-component.js';
const FILEPATH_SCOPED_COMPONENT = 'app/components/scope/my-component.js';

ruleTester.run('no-restricted-files', rule, {
  valid: [
    {
      code: 'const x = 123;',
      options: [{ paths: [REGEXP_DISALLOW_UNSCOPED_COMPONENTS] }],
      filename: FILEPATH_SCOPED_COMPONENT,
    },
  ],
  invalid: [
    {
      code: 'const x = 123;',
      options: [{ paths: [REGEXP_DISALLOW_UNSCOPED_COMPONENTS] }],
      filename: FILEPATH_UNSCOPED_COMPONENT,
      output: null,
      errors: [{ message: DEFAULT_ERROR_MESSAGE, type: 'Program' }],
    },
    {
      // With custom error message:
      code: 'const x = 123;',
      options: [
        {
          paths: [REGEXP_DISALLOW_UNSCOPED_COMPONENTS],
          message: 'No unscoped components.',
        },
      ],
      filename: FILEPATH_UNSCOPED_COMPONENT,
      output: null,
      errors: [{ message: 'No unscoped components.', type: 'Program' }],
    },
    {
      // With two objects passed.
      code: 'const x = 123;',
      options: [
        {
          paths: ['random-path'],
        },
        {
          paths: [REGEXP_DISALLOW_UNSCOPED_COMPONENTS],
          message: 'No unscoped components.',
        },
      ],
      filename: FILEPATH_UNSCOPED_COMPONENT,
      output: null,
      errors: [{ message: 'No unscoped components.', type: 'Program' }],
    },
  ],
});
