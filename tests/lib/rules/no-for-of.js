'use strict';

const rule = require('../../../lib/rules/no-for-of');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('no-for-of', rule, {
  valid: ['for (;;) {}', 'for (a in b) {}'],
  invalid: [
    {
      code: 'for (a of b) {}',
      output: null,
      parserOptions: { ecmaVersion: 6 },
      errors: [
        {
          message:
            "for-of loops are not allowed; use array methods, 'Object.keys(…)', or similar",
          type: 'ForOfStatement',
        },
      ],
    },
  ],
});
