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
      return node.properties.every((property) =>
        property.computed
          ? isLiteral(property.key) && isLiteral(property.value)
          : isLiteral(property.value)
      );

    case 'Identifier':
      return node.name === 'NaN' || node.name === 'undefined';

    default:
      return false;
  }
}

module.exports = isLiteral;
