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
      uniqueItems: true,
      items: {
        type: 'object',
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
        /** @type {{message?:string,paths?:string[]}[]} */
        const config = context.options;
        const match = config.find(
          (option) =>
            !option.paths ||
            option.paths.some(
              (path) => !path || context.getFilename().match(path)
            )
        );
        if (match || config.length === 0) {
          context.report({
            node,
            // @ts-expect-error -- `messageId` is optional.
            messageId: match?.message ? undefined : 'defaultError',
            message: match?.message || undefined, // eslint-disable-line eslint-plugin/prefer-message-ids
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
