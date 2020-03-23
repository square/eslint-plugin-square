'use strict';

const rule = require('../../../lib/rules/no-undef');
const RuleTester = require('eslint').RuleTester;
const stripIndent = require('strip-indent');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run('no-undef', rule, {
  valid: ['// empty', 'var a = 1; a++;'],
  invalid: [
    {
      code: 'a',
      output: null,
      errors: [
        {
          message: "'a' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: 'Ember',
      output: "import Ember from 'ember';\nEmber",
      options: [{ imports: [{ global: 'Ember', path: 'ember' }] }],
      errors: [
        {
          message: "'Ember' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: "import foo from 'bar';\n\nboo();",
      output: "import foo from 'bar';\nimport boo from 'BOO';\n\nboo();",
      options: [{ imports: [{ global: 'boo', path: 'BOO' }] }],
      errors: [
        {
          message: "'boo' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: "t('common.title');",
      output: "import { t } from 'i18n';\nt('common.title');",
      options: [{ imports: [{ global: 't', path: 'i18n', named: true }] }],
      errors: [
        {
          message: "'t' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: stripIndent(`
        import { module } from 'qunit';

        module('foo');
        test('works', function() {
        });
      `),
      output: stripIndent(`
        import { module, test } from 'qunit';

        module('foo');
        test('works', function() {
        });
      `),
      options: [{ imports: [{ global: 'test', path: 'qunit', named: true }] }],
      errors: [
        {
          message: "'test' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: stripIndent(`
        import { aHelper } from 'a-mod';

        new AMOD();
      `),
      output: stripIndent(`
        import AMOD, { aHelper } from 'a-mod';

        new AMOD();
      `),
      options: [{ imports: [{ global: 'AMOD', path: 'a-mod' }] }],
      errors: [
        {
          message: "'AMOD' is not defined.",
          type: 'Identifier',
        },
      ],
    },
    {
      code: stripIndent(`
        import * as QUnit from 'qunit';

        module('foo');
      `),
      output: stripIndent(`
        import * as QUnit from 'qunit';
        import { module } from 'qunit';

        module('foo');
      `),
      options: [
        { imports: [{ global: 'module', path: 'qunit', named: true }] },
      ],
      errors: [
        {
          message: "'module' is not defined.",
          type: 'Identifier',
        },
      ],
    },
  ],
});
