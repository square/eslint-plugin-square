'use strict';

const rule = require('../../../lib/rules/no-async');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE } = rule;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });
ruleTester.run('no-async', rule, {
  valid: [
    'function foo() {}',
    "it('foo', function() {});",
    'const foo = () => {};',
  ],
  invalid: [
    {
      code: 'async function foo() {}',
      output: null,
      errors: [
        {
          message: ERROR_MESSAGE,
          type: 'FunctionDeclaration',
        },
      ],
    },
  ],
});
