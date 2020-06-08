'use strict';

const DEFAULT_ERROR_MESSAGE = 'Files matching this path are not allowed.';

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow files with a path matching a specific regexp',
      category: 'JavaScript',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-restricted-files.md',
    },
    schema: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['paths'],
        properties: {
          message: {
            type: 'string',
          },
          paths: {
            type: 'array',
            items: {
              type: 'string',
            },
            minItems: 1,
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    },
  },

  DEFAULT_ERROR_MESSAGE,

  create(context) {
    return {
      Program(node) {
        const match = context.options.find((option) =>
          option.paths.some((path) => context.getFilename().match(path))
        );
        if (match) {
          context.report({
            node,
            message: match.message || DEFAULT_ERROR_MESSAGE,
            // Uncomment this autofixer to grandfather in existing files.
            // fix(fixer) {
            //   return fixer.insertTextBefore(
            //     node,
            //     '/* eslint square/no-restricted-files:"off" */\n'
            //   );
            // },
          });
        }
      },
    };
  },
};
