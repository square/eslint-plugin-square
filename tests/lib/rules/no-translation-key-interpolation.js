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
    "intl.t('some.key');",
    "this.intl.t('some.key');",
    "this.get('intl').t('some.key');",

    // With valid variable usage:
    'intl.t(SOME_VARIABLE);',
    'this.intl.t(SOME_VARIABLE);',
    "this.get('intl').t(SOME_VARIABLE);",

    // With valid function call:
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

    // With `t` method imported directly:
    "import { t } from 'intl'; t('some.key');",
    "import { t as foo } from 'intl'; t(`key.${variable}`);", // eslint-disable-line no-template-curly-in-string
    "import { t as foo } from 'intl'; foo('some.key');",
    "import { t } from 'other-lib'; t(`key.${variable}`);", // eslint-disable-line no-template-curly-in-string
    {
      code: `
        import { t } from 'i18n';
        t('some.key');
      `,
      options: [{ serviceName: 'i18n' }],
    },

    // Ignore `t` if import source is unknown
    "t('some.key');",
    't(SOME_VARIABLE);',
    't(constructKey());',
    't(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
  ],
  invalid: [
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
      code: 'this.i18n.t(`key.${variable}`);', // eslint-disable-line no-template-curly-in-string
      output: null,
      options: [{ serviceName: 'i18n' }],
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },

    // With `t` method imported directly:
    {
      code: `
        import { t } from 'intl';
        t(\`key.\${variable}\`);
      `,
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      code: `
        import { t } from 'i18n';
        t(\`key.\${variable}\`);
      `,
      output: null,
      options: [{ serviceName: 'i18n' }],
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
    {
      code: `
        import { t as foo } from 'intl';
        foo(\`key.\${variable}\`);
      `,
      output: null,
      errors: [{ messageId: 'error', type: 'CallExpression' }],
    },
  ],
});
