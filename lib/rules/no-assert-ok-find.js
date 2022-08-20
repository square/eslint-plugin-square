'use strict';

const isTestFile = require('../utils/is-test-file');
const { ReferenceTracker } = require('eslint-utils');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow usage of `assert.ok(find(...))` as it will always pass',
      category: 'Ember Testing',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-assert-ok-find.md',
    },
    hasSuggestions: true,
    schema: [],
    messages: {
      error: '`assert.ok(find(...))` will always pass.',
      changeToAssertEqualFindLength:
        'Change to assert.equal(find(...).length, 1).',
    },
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      Program() {
        const tracker = new ReferenceTracker(context.getScope());
        const traceMap = {
          find: { [ReferenceTracker.CALL]: true },
        };

        for (const { node } of tracker.iterateGlobalReferences(traceMap)) {
          const parentNode = node.parent;
          if (
            // Check for assert.ok(...)
            parentNode.type === 'CallExpression' &&
            parentNode.callee.type === 'MemberExpression' &&
            parentNode.callee.object.type === 'Identifier' &&
            parentNode.callee.object.name === 'assert' &&
            parentNode.callee.property.type === 'Identifier' &&
            parentNode.callee.property.name === 'ok' &&
            (parentNode.arguments.length === 1 ||
              parentNode.arguments.length === 2)
          ) {
            context.report({
              node: parentNode,
              messageId: 'error',
              suggest: [
                {
                  messageId: 'changeToAssertEqualFindLength',
                  fix(fixer) {
                    const nodeFind = parentNode.arguments[0];
                    const nodeFindText = context
                      .getSourceCode()
                      .getText(nodeFind);
                    const nodeMessageText =
                      parentNode.arguments.length > 1
                        ? context
                            .getSourceCode()
                            .getText(parentNode.arguments[1])
                        : null;
                    const nodeTextNew = nodeMessageText
                      ? `assert.equal(${nodeFindText}.length, 1, ${nodeMessageText})`
                      : `assert.equal(${nodeFindText}.length, 1)`;
                    return fixer.replaceText(parentNode, nodeTextNew);
                  },
                },
              ],
            });
          }
        }
      },
    };
  },
};
