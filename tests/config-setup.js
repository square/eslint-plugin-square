'use strict';
/* eslint-env node */

const { readdirSync, readFileSync } = require('node:fs');
const path = require('node:path');
const assert = require('node:assert');
const configs = require('../lib').configs;

const CONFIG_NAMES = Object.keys(configs);

describe('config setup is correct', function () {
  it('should have a list of exported configs and config directory that match', function () {
    const filePath = path.join(__dirname, '..', 'lib', 'config');
    const files = readdirSync(filePath);

    assert.deepStrictEqual(
      CONFIG_NAMES,
      files
        .filter((file) => !file.startsWith('.'))
        .map((file) => file.replace('.js', '')),
    );
  });

  it('should mention all configs in the README', function () {
    const filePath = path.join(__dirname, '..', 'README.md');
    const file = readFileSync(filePath);

    for (const configName of CONFIG_NAMES) {
      assert.ok(file.includes(configName));
    }
  });
});
