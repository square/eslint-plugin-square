'use strict';
/* eslint-env node */

const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const assert = require('assert');
const rules = require('../lib').rules;
const configEmber = require('../lib/config/ember');

const RULE_NAMES = Object.keys(rules);
const RULE_NAMES_EMBER = new Set(Object.keys(configEmber.rules));
RULE_NAMES_EMBER.add('square/require-await-function'); // This rule is enabled in an override.

function getAllNamedOptions(jsonSchema) {
  if (!jsonSchema) {
    return [];
  }

  if (Array.isArray(jsonSchema)) {
    return jsonSchema.flatMap((item) => getAllNamedOptions(item));
  }

  if (jsonSchema.items) {
    return getAllNamedOptions(jsonSchema.items);
  }

  if (jsonSchema.properties) {
    return Object.keys(jsonSchema.properties);
  }

  return [];
}

describe('rules setup is correct', function () {
  it('should have a list of exported rules and rules directory that match', function () {
    const filePath = path.join(__dirname, '..', 'lib', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', ''))
    );
  });

  it('should have tests for all rules', function () {
    const filePath = path.join(__dirname, '..', 'tests', 'lib', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', ''))
    );
  });

  it('should have documentation for all rules', function () {
    const filePath = path.join(__dirname, '..', 'docs', 'rules');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.') && !file.startsWith('_'))
        .map((file) => file.replace('.md', ''))
    );
  });

  describe('rule documentation files', function () {
    const CONFIG_MSG_EMBER =
      '🔥 The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.';

    const FIXABLE =
      '🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.';

    const HAS_SUGGESTIONS =
      '💡 Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).';

    for (const ruleName of RULE_NAMES) {
      const rule = rules[ruleName];
      const filePath = path.join(
        __dirname,
        '..',
        'docs',
        'rules',
        `${ruleName}.md`
      );
      const file = readFileSync(filePath, 'utf8');

      describe(ruleName, function () {
        it('should have the right contents (title, examples, fixable notice)', function () {
          assert.ok(file.includes(`# ${ruleName}`), 'includes title header');
          assert.ok(
            file.includes('## Examples'),
            'includes example section header'
          );

          // Check if the rule has configuration options.
          if (
            (Array.isArray(rule.meta.schema) && rule.meta.schema.length > 0) ||
            (typeof rule.meta.schema === 'object' &&
              Object.keys(rule.meta.schema).length > 0)
          ) {
            // Should have a configuration section header:
            assert.ok(
              file.includes('## Configuration'),
              'has a "Configuration" section'
            );

            // Ensure all configuration options are mentioned.
            for (const namedOption of getAllNamedOptions(rule.meta.schema)) {
              assert.ok(
                file.includes(namedOption),
                `mentions rule option ${namedOption}`
              );
            }
          } else {
            assert.ok(
              !file.includes('## Configuration'),
              'does not have a "Configuration" section'
            );
          }

          if (rule.meta.fixable) {
            assert.ok(file.includes(FIXABLE), 'includes fixable notice');
          } else {
            assert.ok(
              !file.includes(FIXABLE),
              'does not include fixable notice'
            );
          }

          if (RULE_NAMES_EMBER.has(`square/${ruleName}`)) {
            assert.ok(
              file.includes(CONFIG_MSG_EMBER),
              'has `ember` config notice'
            );
          } else {
            assert.ok(
              !file.includes(CONFIG_MSG_EMBER),
              'does not have `ember` config notice'
            );
          }

          if (rule.meta.hasSuggestions) {
            assert.ok(
              file.includes(HAS_SUGGESTIONS),
              'includes suggestions notice'
            );
          } else {
            assert.ok(
              !file.includes(HAS_SUGGESTIONS),
              'does not include suggestions notice'
            );
          }
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
