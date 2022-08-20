'use strict';

/**
 * @param {import('eslint').Rule.Node} node
 * @param {string[]} testHooks
 * @returns {boolean}
 */
function isTestHook(node, testHooks) {
  if (node.type !== 'CallExpression') {
    return false;
  }

  if (node.callee.type === 'Identifier') {
    return testHooks.includes(node.callee.name);
  }

  return false;
}

module.exports = isTestHook;
