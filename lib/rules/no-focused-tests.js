'use strict';

const isTestFile = require('../utils/is-test-file');

const ERROR_MESSAGE =
  'Use of `describe.only()`, `context.only()`, or `it.only()` is not allowed.';
const CALLEE_OBJECT_NAMES = ['describe', 'context', 'it'];

module.exports = {
  ERROR_MESSAGE,
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow usage of `describe.only()`, `context.only()`, and `it.only()`',
      category: 'Ember',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-focused-tests.md',
    },
    schema: [],
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        const focusedTestBlockOnlyNode = getFocusedTestBlockOnlyNode(node);

        if (focusedTestBlockOnlyNode !== null) {
          context.report({
            node: focusedTestBlockOnlyNode,
            message: ERROR_MESSAGE,
          });
        }
      },
    };
  },
};

function getFocusedTestBlockOnlyNode(node) {
  if (node.callee.type !== 'MemberExpression') {
    return null;
  }

  if (!CALLEE_OBJECT_NAMES.includes(node.callee.object.name)) {
    return null;
  }

  if (
    (node.callee.property.type === 'Identifier' &&
      node.callee.property.name === 'only') ||
    (node.callee.property.type === 'Literal' &&
      node.callee.property.value === 'only')
  ) {
    return node.callee.property;
  }

  return null;
}
