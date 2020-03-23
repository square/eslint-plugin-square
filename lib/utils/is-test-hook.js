'use strict';

function isTestHook(node, testHooks) {
  if (node.type !== 'CallExpression') {
    return false;
  }

  if (node.callee.type === 'Identifier') {
    return testHooks.includes(node.callee.name);
  }

  if (node.callee.type === 'MemberExpression') {
    return testHooks.includes(node.callee.object.name);
  }

  return false;
}

module.exports = isTestHook;
