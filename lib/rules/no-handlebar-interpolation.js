'use strict';

module.exports = {
  meta: {
    type: 'problem',

    docs: {
      description: 'disallow unsafe HTML in strings/hbs/translations',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-handlebar-interpolation.md',
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
  },

  create(context) {
    // The RegExp looks for variables within a "no-handlebar-interpolation",
    // e.g. {{{foo['bar']}}} or {{{ fooBar.baz }}}
    const tripleStashRegex = /{{{[\w "'.[\]]+}}}/;
    // Defaults to anything `*.js`
    const defaultFilePattern = /\.js$/;
    // Only run on files that match filePatterns.
    const { filePatterns = [defaultFilePattern] } = context.options[0] || {};
    const matchesFilename = filePatterns.some((pattern) => {
      return pattern.test(context.getFilename());
    });

    if (!matchesFilename) {
      return {};
    }

    function checkNode(node) {
      const { value } = node;
      if (typeof value === 'string' && tripleStashRegex.test(value)) {
        context.report({
          node,
          message:
            'Use of "no-handlebar-interpolation" `{{{` to insert unsafe HTML is not allowed',
        });
      }
    }

    return {
      Literal: checkNode,
    };
  },
};
