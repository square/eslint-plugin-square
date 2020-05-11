'use strict';

const isTestFile = require('../utils/is-test-file');
const isTestHook = require('../utils/is-test-hook');
const getParentFunctionNode = require('../utils/get-parent-function-node');

const ERROR_MESSAGE =
  'Test functions should not return a value. If you want to wait on a promise, use async/await.';
const DEFAULT_TEST_HOOKS = [
  'after',
  'afterEach',
  'before',
  'beforeEach',
  'context',
  'describe',
  'it',
  'module',
  'only',
  'setup',
  'skip',
  'start',
  'teardown',
  'test',
  'todo',
];

module.exports = {
  ERROR_MESSAGE,
  DEFAULT_TEST_HOOKS,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow test functions with a return value',
      category: 'Ember',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-test-return-value.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          testHooks: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    const testHooks = getTestHooks(context) || DEFAULT_TEST_HOOKS;

    return {
      ReturnStatement(node) {
        if (!node.argument) {
          return;
        }

        const functionNode = getParentFunctionNode(node);
        if (
          functionNode &&
          functionNode.parent &&
          isTestHook(functionNode.parent, testHooks)
        ) {
          context.report({
            node,
            message: ERROR_MESSAGE,
            /*
            // This autofixer is commented out because it changes the behavior of the code.
            // It can be temporarily uncommented to help fix code as desired.
            fix(fixer) {
              return fixer.removeRange([node.range[0], node.argument.range[0]]);
            }
            */
          });
        }
      },
    };
  },
};

function getTestHooks(context) {
  return context.options && context.options[0] && context.options[0].testHooks;
}
