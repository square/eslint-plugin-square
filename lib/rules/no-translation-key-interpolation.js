'use strict';

const isIdentifier = require('../utils/is-identifier');
const isMemberExpression = require('../utils/is-member-expression');

const ERROR_MESSAGE =
  'Avoid using string interpolation to construct translation keys. Consider using a `switch` statement instead.';

const DEFAULT_SERVICE_NAME = 'intl';
const DEFAULT_METHOD_NAME = 't';

module.exports = {
  ERROR_MESSAGE,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow string interpolation in translation keys',
      category: 'Ember',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-translation-key-interpolation.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          serviceName: {
            type: 'string',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      CallExpression(node) {
        const customServiceName =
          context.options &&
          context.options.length > 0 &&
          context.options[0].serviceName
            ? context.options[0].serviceName
            : null;
        const serviceName = customServiceName || DEFAULT_SERVICE_NAME;

        if (
          (isIntlT(node, serviceName) || isThisIntlT(node, serviceName)) &&
          (node.arguments.length === 1 || node.arguments.length === 2) &&
          node.arguments[0].type === 'TemplateLiteral'
        ) {
          context.report({
            node,
            message: ERROR_MESSAGE,
          });
        }
      },
    };
  },
};

function isIntlT(node, serviceName) {
  // Example: intl.t(...);
  return (
    node.type === 'CallExpression' &&
    isMemberExpression(node.callee) &&
    isIdentifier(node.callee.object) &&
    node.callee.object.name === serviceName &&
    isIdentifier(node.callee.property) &&
    node.callee.property.name === DEFAULT_METHOD_NAME
  );
}

function isThisIntlT(node, serviceName) {
  // Example: this.intl.t(...);
  return (
    node.type === 'CallExpression' &&
    isMemberExpression(node.callee) &&
    isMemberExpression(node.callee.object) &&
    node.callee.object.object.type === 'ThisExpression' &&
    isIdentifier(node.callee.object.property) &&
    node.callee.object.property.name === serviceName &&
    isIdentifier(node.callee.property) &&
    node.callee.property.name === DEFAULT_METHOD_NAME
  );
}
