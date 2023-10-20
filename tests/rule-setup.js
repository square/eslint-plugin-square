'use strict';
/* eslint-env node */

const { readdirSync, readFileSync } = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const rules = require('../lib').rules;
const configEmber = require('../lib/config/ember');

const RULE_NAMES = Object.keys(rules);
const RULE_NAMES_EMBER = new Set(Object.keys(configEmber.rules));
RULE_NAMES_EMBER.add('square/require-await-function'); // This rule is enabled in an override.

describe('rules setup is correct', function () {
  it('should have a list of exported rules and rules directory that match', function () {
    const filePath = path.join(__dirname, '..', 'lib', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', '')),
    );
  });

  it('should have tests for all rules', function () {
    const filePath = path.join(__dirname, '..', 'tests', 'lib', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', '')),
    );
  });

  it('should have documentation for all rules', function () {
    const filePath = path.join(__dirname, '..', 'docs', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.') && !file.startsWith('_'))
        .map((file) => file.replace('.md', '')),
    );
  });

  describe('rule files', function () {
    const TYPE_ANNOTATION = "/** @type {import('eslint').Rule.RuleModule} */";
    const TYPE_ANNOTATION_UNCLOSED = TYPE_ANNOTATION.slice(
      0,
      Math.max(0, TYPE_ANNOTATION.lastIndexOf('}')),
    ); // Allow for & in the type annotation.
    for (const ruleName of RULE_NAMES) {
      const filePath = path.join(
        __dirname,
        '..',
        'lib',
        'rules',
        `${ruleName}.js`,
      );
      const file = readFileSync(filePath, 'utf8');

      describe(ruleName, function () {
        it('should have the right contents', function () {
          assert.ok(
            file.includes(TYPE_ANNOTATION) ||
              file.includes(TYPE_ANNOTATION_UNCLOSED),
            `includes jsdoc comment for rule type: ${TYPE_ANNOTATION}`,
          );
        });
      });
    }
  });

  it('should mention all rules in the README', function () {
    const filePath = path.join(__dirname, '..', 'README.md');
    const file = readFileSync(filePath);

    for (const ruleName of RULE_NAMES) {
      assert.ok(file.includes(ruleName), `mentions \`${ruleName}\``);
    }
  });
});
