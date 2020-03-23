'use strict';

function isStringLiteral(node) {
  return node.type === 'Literal' && typeof node.value === 'string';
}

module.exports = isStringLiteral;
