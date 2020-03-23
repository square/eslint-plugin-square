'use strict';

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow for-of statements',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-for-of.md',
    },
    schema: [],
  },

  create(context) {
    return {
      ForOfStatement(node) {
        context.report({
          node,
          message:
            "for-of loops are not allowed; use array methods, 'Object.keys(…)', or similar",
        });
      },
    };
  },
};
