'use strict';

const isIdentifier = require('../utils/is-identifier');
const scopeReferencesThis = require('../utils/scope-reference-this');
const isTestFile = require('../utils/is-test-file');

function isLazy(node) {
  return isIdentifier(node.callee, 'lazy');
}

function hasArrowFunctionArgument(node) {
  return (
    node.arguments.length >= 2 &&
    node.arguments[1].type === 'ArrowFunctionExpression'
  );
}

function getTextOfParameters(source, parameters) {
  return parameters.map((parameter) => source.getText(parameter)).join(', ');
}

function nodeShouldBeChecked(node) {
  return isLazy(node) && hasArrowFunctionArgument(node);
}

function isImmutableLiteral(node) {
  return (
    node &&
    (node.type === 'Literal' ||
      isIdentifier(node, 'undefined') ||
      isIdentifier(node, 'NaN'))
  );
}

function isImmutableLiteralReturn(node) {
  return (
    node &&
    node.type === 'ArrowFunctionExpression' &&
    node.body.body.length === 1 &&
    node.body.body[0].type === 'ReturnStatement' &&
    isImmutableLiteral(node.body.body[0].argument)
  );
}

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'disallow arrow functions in the qunit-bdd `lazy` test helper',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-lazy-arrow-functions.md',
    },
    schema: [],
  },

  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        if (!nodeShouldBeChecked(node)) {
          return;
        }

        const lazyVariableText = context
          .getSourceCode()
          .getText(node.arguments[0]);
        const arrowFunctionNode = node.arguments[1];

        if (scopeReferencesThis(arrowFunctionNode)) {
          context.report({
            node: arrowFunctionNode,
            message:
              'Using `this` in an arrow function for a lazy callback will be undefined',
          });
          return;
        }

        context.report({
          node: arrowFunctionNode,
          message: 'Use lazy({{variable}}, function() { … })',
          data: {
            variable: lazyVariableText,
          },
          fix(fixer) {
            const parameters = getTextOfParameters(
              context.getSourceCode(),
              arrowFunctionNode.params
            );
            const functionParameters =
              arrowFunctionNode.params.length > 0 ? parameters : '';
            const functionBody = context
              .getSourceCode()
              .getText(arrowFunctionNode.body);

            if (arrowFunctionNode.body.type === 'BlockStatement') {
              if (isImmutableLiteralReturn(arrowFunctionNode)) {
                const returnValueText = context
                  .getSourceCode()
                  .getText(arrowFunctionNode.body.body[0].argument);
                return fixer.replaceText(arrowFunctionNode, returnValueText);
              } else {
                return fixer.replaceText(
                  arrowFunctionNode,
                  `function(${functionParameters}) ${functionBody}`
                );
              }
            } else if (isImmutableLiteral(arrowFunctionNode.body)) {
              return fixer.replaceText(arrowFunctionNode, functionBody);
            } else {
              return fixer.replaceText(
                arrowFunctionNode,
                `function(${functionParameters}) { return ${functionBody}; }`
              );
            }
          },
        });
      },
    };
  },
};
