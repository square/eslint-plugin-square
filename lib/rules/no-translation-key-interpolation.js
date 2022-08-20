'use strict';

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
          enforceStringLiteralKeys: {
            type: 'boolean',
            default: false,
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
    const enforceStringLiteralKeys =
      context.options &&
      context.options.length > 0 &&
      context.options[0].enforceStringLiteralKeys;
    /** @type {string|undefined} */
    let importedTranslationMethodName;

    return {
      ImportDeclaration(node) {
        if (node.source.value === serviceName) {
          importedTranslationMethodName =
            importedTranslationMethodName ||
            getImportIdentifier(node, serviceName, 't');
        }
      },

      CallExpression(node) {
        if (
          ((importedTranslationMethodName &&
            isT(node, importedTranslationMethodName)) ||
            isIntlT(node, serviceName) ||
            isThisIntlT(node, serviceName)) &&
          (node.arguments.length === 1 || node.arguments.length === 2)
        ) {
          if (
            (enforceStringLiteralKeys &&
              node.arguments[0].type !== 'Literal') ||
            node.arguments[0].type === 'TemplateLiteral'
          ) {
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

/**
 * @param {import('eslint').Rule.Node} node
 * @param {string} importedTranslationMethodName
 * @returns {boolean}
 */
function isT(node, importedTranslationMethodName) {
  // Example: import { t } from 'intl'; t(...);
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === importedTranslationMethodName
  );
}

/**
 * @param {import('eslint').Rule.Node} node
 * @param {string} serviceName
 * @returns {boolean}
 */
function isIntlT(node, serviceName) {
  // Example: intl.t(...);
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === serviceName &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === DEFAULT_METHOD_NAME
  );
}

/**
 * @param {import('eslint').Rule.Node} node
 * @param {string} serviceName
 * @returns {boolean}
 */
function isThisIntlT(node, serviceName) {
  // Example: this.intl.t(...);
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'MemberExpression' &&
    node.callee.object.object.type === 'ThisExpression' &&
    node.callee.object.property.type === 'Identifier' &&
    node.callee.object.property.name === serviceName &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === DEFAULT_METHOD_NAME
  );
}
