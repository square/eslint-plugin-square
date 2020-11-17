'use strict';

const isMemberExpression = require('../utils/is-member-expression');
const isIdentifier = require('../utils/is-identifier');
const isTestFile = require('../utils/is-test-file');

const ERROR_MESSAGE = '`assert.ok(find(...))` will always pass.';

const ASSERT_ARGUMENT_NAMES = new Set(['find', 'findButton', 'findLink']);

module.exports = {
  ERROR_MESSAGE,
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow usage of `assert.ok(find(...))` as it will always pass',
      category: 'Ember Testing',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-assert-ok-find.md',
    },
    schema: [],
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        if (
          isAssertOk(node) &&
          node.arguments.length > 0 &&
          isFind(node.arguments[0])
        ) {
          context.report({
            node,
            message: ERROR_MESSAGE,
            /*
            // Autofixer that can be uncommented to fix violations.
            fix(fixer) {
              const nodeFind = node.arguments[0];
              const nodeFindText = context.getSourceCode().getText(nodeFind);
              const nodeMessageText =
                node.arguments.length > 1
                  ? context.getSourceCode().getText(node.arguments[1])
                  : null;
              const nodeTextNew = nodeMessageText
                ? `assert.equal(${nodeFindText}.length, 1, ${nodeMessageText})`
                : `assert.equal(${nodeFindText}.length, 1)`;
              return fixer.replaceText(node, nodeTextNew);
            },
            */
          });
        }
      },
    };
  },
};

function isAssertOk(node) {
  return (
    node.type === 'CallExpression' &&
    isMemberExpression(node.callee) &&
    node.callee.object.name === 'assert' &&
    node.callee.property.name === 'ok' &&
    (node.arguments.length === 1 || node.arguments.length === 2)
  );
}

function isFind(node) {
  return (
    node.type === 'CallExpression' &&
    isIdentifier(node.callee) &&
    ASSERT_ARGUMENT_NAMES.has(node.callee.name) &&
    node.arguments.length === 1
  );
}
