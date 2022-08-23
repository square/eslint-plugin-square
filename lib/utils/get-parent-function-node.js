'use strict';

const FUNCTION_NODE_TYPES = new Set([
  'ArrowFunctionExpression',
  'FunctionExpression',
  'FunctionDeclaration',
]);

/**
 * @param {import('eslint').Rule.Node} node
 * @returns {import('eslint').Rule.Node|undefined}
 */
function getParentFunctionNode(node) {
  let explorer = node.parent;

  while (explorer && !FUNCTION_NODE_TYPES.has(explorer.type)) {
    explorer = explorer.parent;
  }

  return explorer;
}

module.exports = getParentFunctionNode;
