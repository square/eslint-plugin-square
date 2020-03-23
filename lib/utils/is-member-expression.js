'use strict';

const isIdentifier = require('./is-identifier');

/**
 * Determines whether a node is a simple member expression with the given object
 * and property.
 *
 * @param {ASTNode} node
 * @param {string} objectName
 * @param {string} propertyName
 * @returns {boolean}
 */
function isMemberExpression(node, objectName, propertyName) {
  if (!objectName && !propertyName) {
    return node && node.type === 'MemberExpression';
  }

  return (
    node &&
    node.type === 'MemberExpression' &&
    !node.computed &&
    (objectName === 'this'
      ? node.object.type === 'ThisExpression'
      : isIdentifier(node.object, objectName)) &&
    isIdentifier(node.property, propertyName)
  );
}

module.exports = isMemberExpression;
