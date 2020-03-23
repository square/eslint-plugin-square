'use strict';

const isStringLiteral = require('../utils/is-string-literal');

const ERROR_MESSAGE_COMPUTED =
  'Use `Ember.computed.readOnly()` for properties that should be treated as immutable.';
const ERROR_MESSAGE_SET =
  'Do not call `set` on properties that should be treated as immutable.';

module.exports = {
  ERROR_MESSAGE_COMPUTED,
  ERROR_MESSAGE_SET,
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow modifying the specified properties (typically used for globally-injected data that should be treated as immutable)',
      category: 'Ember',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-modifying-immutable-properties.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          properties: {
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
    fixable: 'code',
  },
  create(context) {
    return {
      CallExpression(node) {
        const readOnlyProperties = context.options[0].properties;
        if (isReadOnlyPropertyUsingAliasOrReads(node, readOnlyProperties)) {
          context.report({
            node,
            message: ERROR_MESSAGE_COMPUTED,
            fix(fixer) {
              const argumentText0 = context
                .getSourceCode()
                .getText(node.arguments[0]);
              return node.callee.type === 'MemberExpression'
                ? fixer.replaceText(node, `computed.readOnly(${argumentText0})`)
                : fixer.replaceText(node, `readOnly(${argumentText0})`);
            },
          });
        } else if (isThisSetReadOnlyProperty(node, readOnlyProperties)) {
          context.report({ node, message: ERROR_MESSAGE_SET });
        }
      },
    };
  },
};

function isReadOnlyPropertyUsingAliasOrReads(node, readOnlyProperties) {
  // Looks for: reads('readOnlyProperty') or alias('readOnlyProperty')
  return (
    (isAliasComputedProperty(node) || isReadsComputedProperty(node)) &&
    node.arguments.length === 1 &&
    isStringLiteral(node.arguments[0]) &&
    isReadOnlyProperty(node.arguments[0].value, readOnlyProperties)
  );
}

function isThisSet(node) {
  // Looks for: this.set('readOnlyProperty...', ...);
  return (
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'ThisExpression' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'set' &&
    node.arguments.length === 2 &&
    isStringLiteral(node.arguments[0])
  );
}

function isThisSetReadOnlyProperty(node, readOnlyProperties) {
  return (
    isThisSet(node) &&
    isReadOnlyProperty(node.arguments[0].value, readOnlyProperties)
  );
}

function isAliasComputedProperty(node) {
  return (
    isIdentifierCall(node, 'alias') ||
    isMemberExpressionCall(node, 'computed', 'alias')
  );
}

function isReadsComputedProperty(node) {
  return (
    isIdentifierCall(node, 'reads') ||
    isMemberExpressionCall(node, 'computed', 'reads')
  );
}

function isIdentifierCall(node, name) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === name
  );
}

function isMemberExpressionCall(node, object, name) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === object &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === name
  );
}

function isReadOnlyProperty(property, readOnlyProperties) {
  return (
    readOnlyProperties.includes(property) ||
    readOnlyProperties.some((propertyCurrent) =>
      property.startsWith(`${propertyCurrent}.`)
    )
  );
}
