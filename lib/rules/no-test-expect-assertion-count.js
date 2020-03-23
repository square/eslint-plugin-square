'use strict';

const isIdentifier = require('../utils/is-identifier');
const isLiteral = require('../utils/is-literal');
const isMemberExpression = require('../utils/is-member-expression');
const isTestFile = require('../utils/is-test-file');

const ERROR_MESSAGE = "Don't use `expect(assertionCount)` in tests.";

module.exports = {
  ERROR_MESSAGE,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow `expect(assertionCount)` in tests',
      category: 'Testing',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-test-expect-assertion-count.md',
    },
    schema: [],
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        if (isExpectFunctionCall(node) && node.arguments[0].value !== 0) {
          context.report({
            node,
            message: ERROR_MESSAGE,
            /*
            // This autofixer is commented out because simply removing `expect` calls is unsafe if the assertion is
            // in an asynchronous callback - that's the point of expect(). It can be temporarily uncommented to help
            // fix code as desired, but be aware that you'll need to review each change manually!
            fix(fixer) {
              return fixer.remove(node);
            }
            */
          });
        }
      },
    };
  },
};

function isExpectFunctionCall(node) {
  return (
    isCall(node, 'assert', 'expect') &&
    node.parent.type === 'ExpressionStatement' &&
    node.arguments.length === 1 &&
    isLiteral(node.arguments[0]) &&
    Number.isInteger(node.arguments[0].value)
  );
}

function isCall(node, optionalObject, functionName) {
  return (
    isIdentifier(node.callee, functionName) ||
    isMemberExpression(node.callee, optionalObject, functionName)
  );
}
