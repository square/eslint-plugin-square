'use strict';

const isTestFile = require('../utils/is-test-file');
const isTestHook = require('../utils/is-test-hook');
const getParentFunctionNode = require('../utils/get-parent-function-node');

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

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  DEFAULT_TEST_HOOKS,
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow test functions with a return value',
      category: 'Ember',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-test-return-value.md',
    },
    hasSuggestions: true,
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
    messages: {
      error:
        'Test functions should not return a value. If you want to wait on a promise, use async/await.',
      suggest: 'Remove return keyword',
    },
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
            messageId: 'error',
            suggest: [
              {
                messageId: 'suggest',
                fix(fixer) {
                  return fixer.removeRange([
                    node.range[0],
                    node.argument.range[0],
                  ]);
                },
              },
            ],
          });
        }
      },
    };
  },
};

function getTestHooks(context) {
  return context.options && context.options[0] && context.options[0].testHooks;
}
