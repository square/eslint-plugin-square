'use strict';

const isIdentifier = require('../utils/is-identifier');
const isMemberExpression = require('../utils/is-member-expression');
const { getImportIdentifier } = require('../utils/import');

const DEFAULT_SERVICE_NAME = 'intl';
const DEFAULT_METHOD_NAME = 't';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow string interpolation in translation keys',
      category: 'Ember',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-translation-key-interpolation.md',
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
    messages: {
      error:
        'Avoid using string interpolation to construct translation keys. Consider using a `switch` statement instead.',
    },
  },
  create(context) {
    const serviceName =
      (context.options &&
        context.options.length > 0 &&
        context.options[0].serviceName) ||
      DEFAULT_SERVICE_NAME;
    let importedTranslationMethodName;

    return {
      ImportDeclaration(node) {
        if (node.source.value === serviceName) {
          importedTranslationMethodName = getImportIdentifier(
            node,
            serviceName,
            't'
          );
        }
      },

      CallExpression(node) {
        if (
          (isT(node, serviceName, importedTranslationMethodName) ||
            isIntlT(node, serviceName) ||
            isThisIntlT(node, serviceName)) &&
          (node.arguments.length === 1 || node.arguments.length === 2)
        ) {
          if (node.arguments[0].type === 'TemplateLiteral') {
            context.report({
              node,
              messageId: 'error',
            });
          }
        }
      },
    };
  },
};

function isT(node, serviceName, importedTranslationMethodName) {
  // Example: import { t } from 'intl'; t(...);
  return (
    node.type === 'CallExpression' &&
    isIdentifier(node.callee) &&
    node.callee.name === importedTranslationMethodName
  );
}

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
