'use strict';

const rule = require('../../../lib/rules/require-await-function');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
});

const VALID_USAGES = [
  {
    code: 'async function myFunction() { await asyncFunc(); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // When the 'AwaitExpression' isn't the direct parent of the 'CallExpression'.
    code: 'async function myFunction() { await asyncFunc().then(() => {}); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Returning the result of the async function
    code: 'function myFunction() { return asyncFunc(); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Arrow function directly returning the result
    code: 'const myFunction = () => asyncFunc();',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Part of a nested function call, foo() might want to consume a promise directly
    code: 'function test() { foo(asyncFunc()); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Returning the result of a nested function call
    code: 'function test() { return foo(asyncFunc()); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Returning the result of a nested arrow function call
    code: 'const test = () => foo(asyncFunc());',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Not one of the specified functions.
    code: 'otherFunc();',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Not one of the specified functions.
    code: 'async function myFunction() { await otherAsyncFunc(); }',
    options: [{ functions: ['asyncFunc'] }],
  },
  {
    // Allowed to store promise into variable with assignment.
    code: 'async function myFunction() { const promise = asyncFunc(); await promise; }',
    options: [{ functions: ['asyncFunc'] }],
  },
];

const INVALID_USAGES = [
  {
    // Missing `await`.
    code: 'async function test() { asyncFunc(); }',
    options: [{ functions: ['asyncFunc'] }],
    output: 'async function test() { await asyncFunc(); }',
    errors: [
      {
        message: 'Use `await` with `asyncFunc` function call.',
        type: 'CallExpression',
      },
    ],
  },
  {
    // Missing `await` and part of promise chain.
    code: 'async function test() { asyncFunc().then(() => {}); }',
    options: [{ functions: ['asyncFunc'] }],
    output: 'async function test() { await asyncFunc().then(() => {}); }',
    errors: [
      {
        message: 'Use `await` with `asyncFunc` function call.',
        type: 'CallExpression',
      },
    ],
  },
  {
    // Missing `await` but inside another `await` function call.
    code: 'async function topLevelFunction() { await otherAsyncFunc(async () => { asyncFunc(); }); }',
    options: [{ functions: ['asyncFunc'] }],
    output:
      'async function topLevelFunction() { await otherAsyncFunc(async () => { await asyncFunc(); }); }',
    errors: [
      {
        message: 'Use `await` with `asyncFunc` function call.',
        type: 'CallExpression',
      },
    ],
  },
];

ruleTester.run('require-await-function', rule, {
  valid: VALID_USAGES,
  invalid: INVALID_USAGES,
});
