'use strict';

/**
 * Check whether or not a node is an ImportDeclaration.
 *
 * @param {Object} node The node to check.
 * @returns {boolean} Whether or not the node is an ImportDeclaration.
 */
function isImportDeclaration(node) {
  return node !== undefined && node.type === 'ImportDeclaration';
}

module.exports = isImportDeclaration;
