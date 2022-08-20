'use strict';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow unsafe HTML in strings/hbs/translations',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-handlebar-interpolation.md',
    },

    schema: [
      {
        type: 'object',
        properties: {
          filePatterns: {
            type: 'array',
            items: {
              type: 'object',
            },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      error:
        'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
    },
  },

  create(context) {
    // The RegExp looks for variables within a "no-handlebar-interpolation",
    // e.g. {{{foo['bar']}}} or {{{ fooBar.baz }}}
    const tripleStashRegex = /{{{[\w "'.[\]]+}}}/;
    // Defaults to anything `*.js`
    const defaultFilePattern = /\.js$/;
    // Only run on files that match filePatterns.
    /** @type {{filePatterns: RegExp[]}} */
    const { filePatterns = [defaultFilePattern] } = context.options[0] || {};
    const matchesFilename = filePatterns.some((pattern) => {
      return pattern.test(context.getFilename());
    });

    if (!matchesFilename) {
      return {};
    }

    /**
     * @param {import('estree').Literal} node
     */
    function checkNode(node) {
      const { value } = node;
      if (typeof value === 'string' && tripleStashRegex.test(value)) {
        context.report({
          node,
          messageId: 'error',
        });
      }
    }

    return {
      Literal: checkNode,
    };
  },
};
