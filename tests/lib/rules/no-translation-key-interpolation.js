'use strict';

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-translation-key-interpolation');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

ruleTester.run('no-translation-key-interpolation', rule, {
  valid: [
    // With valid string:
    "t('some.key');",
    "intl.t('some.key');",
    "this.intl.t('some.key');",
    "this.get('intl').t('some.key');",

    // With valid variable usage:
    't(SOME_VARIABLE);',
    'intl.t(SOME_VARIABLE);',
    'this.intl.t(SOME_VARIABLE);',
    "this.get('intl').t(SOME_VARIABLE);",

    // With valid function call:
    't(constructKey());',
    'intl.t(constructKey());',
    'this.intl.t(constructKey());',
    "this.get('intl').t(constructKey());",

    // Not the right function:
    'otherClass.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
    'intl.otherFunction(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string

    // Not the right function (with `this`):
    'this.otherClass.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
    'this.intl.otherFunction(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string

    // Custom service name:
    {
      code: "this.i18n.t('some.key');",
      options: [{ serviceName: 'i18n' }],
    },
  ],
  invalid: [
    {
      code: 't(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      code: 'intl.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      // With variable:
      code: 'intl.t(`key.${variable}`, { someVariable: 123 });', // eslint-disable-line no-template-curly-in-string
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      code: 'this.intl.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },

    // Custom service name:
    {
      code: 't(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      options: [{ serviceName: 'i18n' }],
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      code: 'this.i18n.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      options: [{ serviceName: 'i18n' }],
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
  ],
});
