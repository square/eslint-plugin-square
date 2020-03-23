'use strict';

const isIdentifier = require('../utils/is-identifier');
const isMemberExpression = require('../utils/is-member-expression');

/**
 * Checks if the given node is part of a call with the `await` keyword.
 *
 * @param {ASTNode} node - the node to check.
 * @returns {boolean} `true` if the node is part of a call with the `await` keyword.
 */
function isAwaitCall(node) {
  if (!node.parent) {
    // Can't be part of an AwaitExpression if it has no parent.
    return false;
  }

  const parent = node.parent;

  if (parent.type === 'AwaitExpression') {
    return true;
  }

  if (parent.type === 'CallExpression' || isMemberExpression(parent)) {
    // Check to see if the AwaitExpression is still another level above.
    return isAwaitCall(parent);
  }

  return false;
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'enforce using `await` with calls to specified functions',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/require-await-function.md',
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

        if (!isAwaitCall(node)) {
          // Missing `await`.
          context.report({
            node,
            message: 'Use `await` with `{{ calleeName }}` function call.',
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
