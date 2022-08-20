'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow files with a path matching a specific regexp',
      category: 'JavaScript',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-restricted-files.md',
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
    messages: {
      defaultError: 'Files matching this path are not allowed.',
    },
  },

  create(context) {
    return {
      Program(node) {
        /** @type {{message?:string,paths:string[]}[]} */
        const config = context.options;
        const match = config.find((option) =>
          option.paths.some((path) => context.getFilename().match(path))
        );
        if (match) {
          context.report({
            node,
            // @ts-ignore -- `messageId` is optional.
            messageId: match.message ? undefined : 'defaultError',
            message: match.message, // eslint-disable-line eslint-plugin/prefer-message-ids
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
