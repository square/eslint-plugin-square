'use strict';

/**
 * Determines whether this AST node is composed entirely of literal values.
 *
 * @param {ASTNode} node
 * @returns {boolean}
 */
function isLiteral(node) {
  switch (node.type) {
    case 'Literal':
      return true;

    case 'ArrayExpression':
      return node.elements.every(isLiteral);

    case 'ObjectExpression':
      return node.properties.every((property) => {
        if (property.computed) {
          return isLiteral(property.key) && isLiteral(property.value);
        } else {
          return isLiteral(property.value);
        }
      });

    case 'Identifier':
      return node.name === 'NaN' || node.name === 'undefined';

    default:
      return false;
  }
}

module.exports = isLiteral;
