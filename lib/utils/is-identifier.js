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
    return name ? node.name === name : true;
  }

  return false;
}

module.exports = isIdentifier;
