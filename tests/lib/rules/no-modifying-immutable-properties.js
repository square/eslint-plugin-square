'use strict';

const rule = require('../../../lib/rules/no-modifying-immutable-properties');
const RuleTester = require('eslint').RuleTester;

const { ERROR_MESSAGE_COMPUTED, ERROR_MESSAGE_SET } = rule;

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
});

ruleTester.run('no-modifying-immutable-properties', rule, {
  valid: [
    // ****************************************
    // Test cases for computed property macros.
    // ****************************************
    {
      code: "readOnly('currentUser')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "readOnly('currentUser.isUS')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "computed.readOnly('currentUser.isUS')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "alias('myProperty')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "alias('myProperty.otherThing')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "computed.alias('myProperty')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "reads('myProperty')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "reads('myProperty.otherThing')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "computed.reads('myProperty')",
      options: [{ properties: ['currentUser'] }],
    },

    // ****************************************
    // Test cases for this.set(...);
    // ****************************************
    {
      code: "this.get('currentUser.somePermission')",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "something.set('currentUser.somePermission', true)",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "this.set('someProperty.somePermission', true)",
      options: [{ properties: ['currentUser'] }],
    },
    {
      code: "this.set('currentUserWithLongerName.somePermission', true)",
      options: [{ properties: ['currentUser'] }],
    },
  ],
  invalid: [
    // ****************************************
    // Test cases for computed property macros.
    // ****************************************
    {
      code: "alias('currentUser')",
      options: [{ properties: ['currentUser'] }],
      output: "readOnly('currentUser')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },
    {
      code: "alias('currentUser.isUS')",
      options: [{ properties: ['currentUser'] }],
      output: "readOnly('currentUser.isUS')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },
    {
      code: "computed.alias('currentUser')",
      options: [{ properties: ['currentUser'] }],
      output: "computed.readOnly('currentUser')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },
    {
      code: "reads('currentUser')",
      options: [{ properties: ['currentUser'] }],
      output: "readOnly('currentUser')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },
    {
      code: "reads('currentUser.isUS')",
      options: [{ properties: ['currentUser'] }],
      output: "readOnly('currentUser.isUS')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },
    {
      code: "computed.reads('currentUser')",
      options: [{ properties: ['currentUser'] }],
      output: "computed.readOnly('currentUser')",
      errors: [{ message: ERROR_MESSAGE_COMPUTED, type: 'CallExpression' }],
    },

    // ****************************************
    // Test cases for this.set(...);
    // ****************************************
    {
      code: "this.set('currentUser', {})",
      options: [{ properties: ['currentUser'] }],
      output: null,
      errors: [{ message: ERROR_MESSAGE_SET, type: 'CallExpression' }],
    },
    {
      code: "this.set('currentUser.somePermission', true)",
      options: [{ properties: ['currentUser'] }],
      output: null,
      errors: [{ message: ERROR_MESSAGE_SET, type: 'CallExpression' }],
    },
  ],
});
