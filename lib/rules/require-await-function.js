'use strict';

const isIdentifier = require('../utils/is-identifier');
const isMemberExpression = require('../utils/is-member-expression');

/**
 * Checks if the given node is part of a call with the `await` keyword or a direct `return`.
 *
 * @param {ASTNode} node - the node to check.
 * @returns {boolean} `true` if the node is part of a call with the `await` keyword.
 */
function isAwaitOrReturnCall(node) {
  if (!node.parent) {
    // Can't be part of an AwaitExpression if it has no parent.
    return false;
  }

  const parent = node.parent;

  if (parent.type === 'AwaitExpression' || parent.type === 'ReturnStatement') {
    return true;
  }

  if (parent.type === 'CallExpression' || isMemberExpression(parent)) {
    // Check to see if the AwaitExpression is still another level above.
    return isAwaitOrReturnCall(parent);
  }

  return false;
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce using `await` with calls to specified functions',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/require-await-function.md',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          functions: {
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
      error: 'Use `await` with `{{ calleeName }}` function call.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;
        if (
          !isIdentifier(callee) ||
          !context.options[0].functions.includes(callee.name)
        ) {
          // Not one of the specified async functions.
          return;
        }

        if (!isAwaitOrReturnCall(node)) {
          // Missing `await`.
          context.report({
            node,
            messageId: 'error',
            data: {
              calleeName: node.callee.name,
            },
            fix(fixer) {
              // TODO: add `async` keyword to containing function if necessary.
              return fixer.insertTextBefore(node, 'await ');
            },
          });
        }
      },
    };
  },
};
