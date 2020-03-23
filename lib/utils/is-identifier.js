'use strict';

/**
 * Checks whether the node is an identifier and optionally, its name.
 *
 * @param {ASTNode} node
 * @param {string=} name
 * @returns {boolean}
 */
function isIdentifier(node, name) {
  if (node.type !== 'Identifier') {
    return false;
  }

  if (name) {
    return node.name === name;
  }

  return true;
}

module.exports = isIdentifier;
