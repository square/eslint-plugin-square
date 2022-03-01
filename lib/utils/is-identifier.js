'use strict';

/**
 * Checks whether the node is an identifier and optionally, its name.
 *
 * @param {ASTNode} node
 * @param {string=} name
 * @returns {boolean}
 */
function isIdentifier(node, name) {
  if (node !== undefined && node.type === 'Identifier') {
    return true;
  }

  if (node !== undefined && name) {
    return node.name === name;
  }

  return false;
}

module.exports = isIdentifier;
