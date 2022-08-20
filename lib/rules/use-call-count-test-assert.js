'use strict';

const isTestFile = require('../utils/is-test-file');

const ASSERT_PROPERTY_NAMES = ['ok', 'notOk'];

const STUB_PROPERTY_NAMES = [
  'notCalled',
  'calledOnce',
  'calledTwice',
  'calledThrice',
  'called',
];

/** @type {import('eslint').Rule.RuleModule & { ASSERT_PROPERTY_NAMES: string[], STUB_PROPERTY_NAMES: string[] }} */
module.exports = {
  ASSERT_PROPERTY_NAMES,
  STUB_PROPERTY_NAMES,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'enforce using `assert.equal(...callCount, ...);` instead of `assert.ok(...calledOnce);`',
      category: 'Ember',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/use-call-count-test-assert.md',
    },
    fixable: 'code',
    schema: [],
    messages: {
      error:
        'Use `assert.equal(...callCount, ...);` to get more helpful test failure messages.',
    },
  },
  create(context) {
    if (!isTestFile(context.getFilename())) {
      return {};
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type !== 'MemberExpression' ||
          node.callee.object.type !== 'Identifier' ||
          node.callee.object.name !== 'assert'
        ) {
          return;
        }

        const assertPropertyName =
          node.callee.type === 'MemberExpression' &&
          node.callee.property.type === 'Identifier'
            ? node.callee.property.name
            : null;
        if (
          !assertPropertyName ||
          !ASSERT_PROPERTY_NAMES.includes(assertPropertyName)
        ) {
          return;
        }

        if (node.arguments.length === 0) {
          return;
        }

        const stubPropertyName =
          node.arguments[0].type === 'MemberExpression' &&
          node.arguments[0].property.type === 'Identifier'
            ? node.arguments[0].property.name
            : null;
        if (
          !stubPropertyName ||
          !STUB_PROPERTY_NAMES.includes(stubPropertyName)
        ) {
          return;
        }

        context.report({
          node,
          messageId: 'error',
          fix(fixer) {
            // Get `calledOnce` (as an example).
            const isAssertNotOkayCalled =
              assertPropertyName === 'notOk' && stubPropertyName === 'called';
            if (stubPropertyName === 'called' && !isAssertNotOkayCalled) {
              // Can't autofix this since we don't know the expected call count.
              return null;
            }

            // Get source code of the call: `assert.ok(this.myStub.calledOnce);`
            const sourceCode = context.getSourceCode();
            const text = sourceCode.getText(node);

            // Get `this.myStub` out of the `this.myStub.calledOnce` parameter.
            if (
              node.arguments[0].type !== 'MemberExpression' ||
              !node.arguments[0].object.range ||
              !node.range
            ) {
              return null;
            }
            const stub = text.slice(
              node.arguments[0].object.range[0] - node.range[0],
              node.arguments[0].object.range[1] - node.range[0]
            );

            // Convert `calledOnce` to `1`.
            const expectedCallCount = isAssertNotOkayCalled
              ? 0
              : STUB_PROPERTY_NAMES.indexOf(stubPropertyName);

            // Retrieve the optional message parameter.
            const optionalMessageParameter =
              node.arguments.length === 2 && node.arguments[1].range
                ? text.slice(
                    node.arguments[1].range[0] - node.range[0],
                    node.arguments[1].range[1] - node.range[0]
                  )
                : null;

            // Switch to the new assert function.
            const newText = optionalMessageParameter
              ? `assert.equal(${stub}.callCount, ${expectedCallCount}, ${optionalMessageParameter})`
              : `assert.equal(${stub}.callCount, ${expectedCallCount})`;

            return fixer.replaceText(node, newText);
          },
        });
      },
    };
  },
};
