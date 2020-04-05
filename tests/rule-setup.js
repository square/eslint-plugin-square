'use strict';
/* eslint-env node */

const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const assert = require('assert');
const rules = require('../lib').rules;
const configEmber = require('../lib/config/ember');

const RULE_NAMES = Object.keys(rules);
const RULE_NAMES_EMBER = new Set(Object.keys(configEmber.rules));
RULE_NAMES_EMBER.add('square/require-await-function'); // This rule is enabled in an override.

describe('rules setup is correct', function () {
  it('should have a list of exported rules and rules directory that match', function () {
    const path = join(__dirname, '..', 'lib', 'rules');
    const files = readdirSync(path);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', ''))
    );
  });

  it('should have tests for all rules', function () {
    const path = join(__dirname, '..', 'tests', 'lib', 'rules');
    const files = readdirSync(path);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', ''))
    );
  });

  it('should have documentation for all rules', function () {
    const path = join(__dirname, '..', 'docs', 'rules');
    const files = readdirSync(path);

    assert.deepStrictEqual(
      RULE_NAMES,
      files
        .filter((file) => !file.startsWith('.') && !file.startsWith('_'))
        .map((file) => file.replace('.md', ''))
    );
  });

  it('should have the right contents (title, examples, fixable notice) for each rule documentation file', function () {
    const CONFIG_MSG_EMBER =
      ':fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.';

    RULE_NAMES.forEach((ruleName) => {
      const rule = rules[ruleName];
      const path = join(__dirname, '..', 'docs', 'rules', `${ruleName}.md`);
      const file = readFileSync(path, 'utf8');

      assert.ok(file.includes(`# ${ruleName}`), 'includes title header');
      assert.ok(
        file.includes('## Examples'),
        'includes example section header'
      );

      if (rule.meta.fixable === 'code') {
        assert.ok(file.includes('(fixable)'), 'includes fixable notice');
      } else {
        assert.ok(
          !file.includes('(fixable)'),
          'does not include fixable notice'
        );
      }

      if (RULE_NAMES_EMBER.has(`square/${ruleName}`)) {
        assert.ok(file.includes(CONFIG_MSG_EMBER), 'has `ember` config notice');
      } else {
        assert.ok(
          !file.includes(CONFIG_MSG_EMBER),
          'does not have `ember` config notice'
        );
      }
    });
  });

  it('should mention all rules in the README', function () {
    const path = join(__dirname, '..', 'README.md');
    const file = readFileSync(path);

    RULE_NAMES.forEach((ruleName) => assert.ok(file.includes(ruleName)));
  });
});
