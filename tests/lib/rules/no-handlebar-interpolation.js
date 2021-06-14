'use strict';

const rule = require('../../../lib/rules/no-handlebar-interpolation');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('no-handlebar-interpolation', rule, {
  valid: [
    // Doesn't capture double brackets
    {
      filename: 'foo/bar.js',
      code: '{{bar}}',
    },
    // Doesn't capture double brackets in function
    {
      filename: 'foo/bar.js',
      code: "const foo = (bar) => { return '{{bar}}'; };",
      parserOptions: { ecmaVersion: 2020 },
    },
    // Ignores file types that doesn't match default pattern
    {
      filename: 'foo/bar.hbs',
      code: "function foo(bar) { return '{{{bar}}}'; }",
    },
    // Ignores file types that doesn't match specified pattern
    {
      filename: 'foo/bar.js',
      code: "function foo(bar) { return '{{{bar}}}'; }",
      options: [{ filePatterns: [/\.hbs$/] }],
    },
  ],
  invalid: [
    // Captures triple brackets in function in file that matches default pattern
    {
      filename: 'foo/bar.js',
      code: "function foo(bar) { return '{{{bar}}}'; }",
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
    // Captures triple brackets in file that matches specified pattern with
    // single quote property accessor
    {
      filename: 'foo/bar.hbs',
      code: '"{{{foo[\'bar\']}}}"',
      output: null,
      options: [{ filePatterns: [/\.hbs$/] }],
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
    // Captures triple brackets in function in file that matches default pattern
    // with double quote property accessor and white spaces
    {
      filename: 'foo/bar.js',
      code: '\'{{{ fooBar["baz"] }}}\'',
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
    // Captures triple brackets in function in file that matches default pattern
    // with property name accessor
    {
      filename: 'foo/bar.js',
      code: "'{{{fooBar.baz}}}'",
      output: null,
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
    // Captures triple brackets in file that matches the first specified pattern
    {
      filename: 'foo/bar.hbs',
      code: "'{{{foo}}}'",
      output: null,
      options: [{ filePatterns: [/\.hbs$/, /\.js$/] }],
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
    // Captures triple brackets in file that matches the last specified pattern
    {
      filename: 'foo/bar.js',
      code: "'{{{foo}}}'",
      output: null,
      options: [{ filePatterns: [/\.hbs$/, /\.js$/] }],
      errors: [
        {
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
          type: 'Literal',
        },
      ],
    },
  ],
});
