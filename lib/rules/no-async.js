'use strict';

const ERROR_MESSAGE = 'async/await is not allowed';

module.exports = {
  ERROR_MESSAGE,

  meta: {
    type: 'problem',
    docs: {
      description: 'disallow usage of async/await syntax',
      category: 'JavaScript',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-async.md',
    },
    schema: [],
  },

  create(context) {
    function checkNode(node) {
      if (node.async) {
        context.report({
          node,
          message: ERROR_MESSAGE,
        });
      }
    }

    return {
      FunctionDeclaration: checkNode,
      FunctionExpression: checkNode,
      ArrowFunctionExpression: checkNode,
    };
  },
};
