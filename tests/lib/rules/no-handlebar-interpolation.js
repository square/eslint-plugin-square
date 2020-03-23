'use strict';

const rule = require('../../../lib/rules/no-handlebar-interpolation');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('no-handlebar-interpolation', rule, {
  valid: [
    // Doesn't capture double brackets
    {
      code: '{{bar}}',
      filename: 'foo/bar.js',
    },
    // Doesn't capture double brackets in function
    {
      code: "const foo = (bar) => { return '{{bar}}'; };",
      filename: 'foo/bar.js',
      parserOptions: { ecmaVersion: 6 },
    },
    // Ignores file types that doesn't match default pattern
    {
      code: "function foo(bar) { return '{{{bar}}}'; }",
      filename: 'foo/bar.hbs',
    },
    // Ignores file types that doesn't match specified pattern
    {
      code: "function foo(bar) { return '{{{bar}}}'; }",
      filename: 'foo/bar.js',
      options: [{ filePatterns: [/\.hbs$/] }],
    },
  ],
  invalid: [
    // Captures triple brackets in function in file that matches default pattern
    {
      code: "function foo(bar) { return '{{{bar}}}'; }",
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      filename: 'foo/bar.js',
    },
    // Captures triple brackets in file that matches specified pattern with
    // single quote property accessor
    {
      code: '"{{{foo[\'bar\']}}}"',
      output: null,
      filename: 'foo/bar.hbs',
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      options: [{ filePatterns: [/\.hbs$/] }],
    },
    // Captures triple brackets in function in file that matches default pattern
    // with double quote property accessor and white spaces
    {
      code: '\'{{{ fooBar["baz"] }}}\'',
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      filename: 'foo/bar.js',
    },
    // Captures triple brackets in function in file that matches default pattern
    // with property name accessor
    {
      code: "'{{{fooBar.baz}}}'",
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      filename: 'foo/bar.js',
    },
    // Captures triple brackets in file that matches the first specified pattern
    {
      code: "'{{{foo}}}'",
      output: null,
      filename: 'foo/bar.hbs',
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      options: [{ filePatterns: [/\.hbs$/, /\.js$/] }],
    },
    // Captures triple brackets in file that matches the last specified pattern
    {
      code: "'{{{foo}}}'",
      output: null,
      filename: 'foo/bar.js',
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
      options: [{ filePatterns: [/\.hbs$/, /\.js$/] }],
    },
  ],
});
