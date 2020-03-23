'use strict';

const FUNCTION_NODE_TYPES = [
  'ArrowFunctionExpression',
  'FunctionExpression',
  'FunctionDeclaration',
];

function getParentFunctionNode(node) {
  let explorer = node.parent;

  while (explorer && !FUNCTION_NODE_TYPES.includes(explorer.type)) {
    explorer = explorer.parent;
  }

  return explorer;
}

module.exports = getParentFunctionNode;
