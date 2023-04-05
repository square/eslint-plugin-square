'use strict';

const { existsSync } = require('node:fs');
const path = require('node:path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow files without a corresponding test file',
      category: 'Ember',
      url: 'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-missing-tests.md',
    },
    schema: [
      {
        type: 'array',
        minItems: 1,
        items: {
          type: 'object',
          required: ['filePath', 'testPaths'],
          properties: {
            filePath: {
              type: 'string',
            },
            testPaths: {
              type: 'array',
              minItems: 1,
              items: {
                type: 'string',
              },
            },
            hasTestSuffix: {
              type: 'boolean',
              default: true,
            },
          },
          additionalProperties: false,
        },
      },
    ],
    messages: {
      error: 'File is missing a corresponding test file.',
    },
  },
  create(context) {
    /** @type {{filePath:string,testPaths:string[],hasTestSuffix?:boolean}[]} */
    const config = context.options[0];
    const matchingLocation = config.find((location) =>
      context.getFilename().includes(location.filePath)
    );

    if (!matchingLocation) {
      // Rule configuration does not apply to this file.
      return {};
    }

    const filename = context
      .getFilename()
      .replace(matchingLocation.filePath, '')
      .replace(/\.([jt]sx?|m[jt]s|c[jt]s)$/, '');

    const suffix = matchingLocation.hasTestSuffix ? '-test' : '';
    const possibleTestPaths = matchingLocation.testPaths.flatMap((testPath) => [
      path.join(testPath, `${filename}${suffix}.js`),
      path.join(testPath, `${filename}${suffix}.ts`),
    ]);

    const foundMatchingTest = possibleTestPaths.some((possibleTestPath) =>
      existsSync(possibleTestPath)
    );
    if (foundMatchingTest) {
      // File has corresponding test file.
      return {};
    }

    return {
      Program(node) {
        // File is missing corresponding test file.
        context.report({
          node,
          loc: { line: 1, column: 0 }, // Mark only first character as a violation to avoid annoyingly highlighting everything in the file as a violation.
          messageId: 'error',
          // Uncomment this autofixer to grandfather in existing files that are missing tests.
          // fix(fixer) {
          //   return fixer.insertTextBefore(node, '/* eslint square/no-missing-tests: "off" */\n');
          // }
        });
      },
    };
  },
};
