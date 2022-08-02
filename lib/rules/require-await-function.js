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

/**
 * Checks if the given node is part of a call with the `return` keyword or direct arrow return.
 *
 * @param {ASTNode} node - the node to check.
 * @returns {boolean} `true` if the node is part of a returned call
 */
function isReturnCall(node) {
  const parent = node.parent;

  if (
    parent.type === 'ReturnStatement' ||
    parent.type === 'ArrowFunctionExpression'
  ) {
    return true;
  }

  if (parent.type === 'CallExpression' || isMemberExpression(parent)) {
    return isReturnCall(parent);
  }

  return false;
}

/**
 * Checks if the given node is a nested call
 *
 * @param {ASTNode} node - the node to check.
 * @returns {boolean} `true` if the node is nested within another function
 */
function isNestedCall(node, isPromiseChain = false) {
  const parent = node.parent;

  if (parent.type === 'CallExpression') {
    if (isPromiseChain) {
      return isNestedCall(parent, false);
    } else {
      return true;
    }
  }

  if (isMemberExpression(parent)) {
    return isNestedCall(parent, true);
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

        if (node.parent.type === 'VariableDeclarator') {
          // Allowed to store promise into variable with assignment.
          return;
        }

        if (!isAwaitCall(node) && !isReturnCall(node) && !isNestedCall(node)) {
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
