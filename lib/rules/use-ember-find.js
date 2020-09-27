'use strict';

const isStringLiteral = require('../utils/is-string-literal');
const isTestFile = require('../utils/is-test-file');

const ERROR_MESSAGE =
  "Use Ember's `find` helper instead of `jQuery` for selecting elements in tests.";

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "require use of Ember's `find` helper instead of `jQuery` for selecting elements in tests",
      category: 'Ember Testing',
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/use-ember-find.md',
    },
    fixable: 'code',
    schema: [],
  },

  ERROR_MESSAGE,

  create(context) {
    if (!isTestFile(context.getFilename())) {
      // It never makes sense to use this rule outside of tests
      // as this rule suggests switching to a test-only helper.
      return {};
    }

    return {
      CallExpression(node) {
        if (isJQueryCallWithSelector(node)) {
          context.report({
            node,
            message: ERROR_MESSAGE,

            fix(fixer) {
              // The strategy is to replace the `$` or `jQuery` with `find` and
              // also add the string 'body' as an argument after the first
              // argument, overriding the default context of the app container.
              //
              // We have to do our work with a single string edit, but we have
              // two places we want to change. This means we need to replace
              // the whole call expression. To do so, we carefully preserve
              // everything around the parts we wish to change.
              //
              // The examples below are based on a typical call,
              // `$('.some-class')`, and a variant of it that illustrates
              // preserving parentheses surrounding the callee.
              const source = context.getSourceCode();
              const callText = source.getText(node);
              const calleeText = source.getText(node.callee);
              const argumentText = source.getText(node.arguments[0]);
              const calleeIndex = callText.indexOf(calleeText);
              const argumentIndex = callText.lastIndexOf(argumentText);

              // ($)('.some-class')
              // ^
              const beforeCallee = callText.slice(0, calleeIndex);

              // $('.some-class')
              //  ^^^^^^^^^^^^^^
              const afterCalleeThroughFirstArgument = callText.slice(
                calleeIndex + calleeText.length,
                argumentIndex + argumentText.length
              );

              // $('.some-class')
              //                ^
              const afterArgument = callText.slice(
                argumentIndex + argumentText.length
              );

              // find('.some-class', 'body')
              // ^^^^              ^^^^^^^^
              return fixer.replaceText(
                node,
                `${beforeCallee}find${afterCalleeThroughFirstArgument}, 'body'${afterArgument}`
              );
            },
          });
        }
      },
    };
  },
};

/**
 * Check that a node represents a call to find elements using jQuery.
 *
 * @param {ASTNode} node
 * @return {boolean}
 */
function isJQueryCallWithSelector(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    (node.callee.name === '$' || node.callee.name === 'jQuery') &&
    node.arguments.length === 1 &&
    (node.arguments[0].type === 'TemplateLiteral' ||
      isStringLiteral(node.arguments[0]))
  );
}
