'use strict';

const isTestFile = require('../../../lib/utils/is-test-file');
const assert = require('node:assert');

describe('isTestFile', () => {
  it('detects test files', () => {
    assert.ok(isTestFile('some-test.js'));
    assert.ok(isTestFile('some-test.jsx'));
    assert.ok(isTestFile('some-test.ts'));
    assert.ok(isTestFile('some-test.tsx'));
    assert.ok(isTestFile('some-test.mjs'));
    assert.ok(isTestFile('some-test.cjs'));
    assert.ok(isTestFile('some-test.mts'));
    assert.ok(isTestFile('some-test.cts'));
  });

  it('does not detect other files', () => {
    assert.ok(!isTestFile('some-component.js'));
    assert.ok(!isTestFile('some-component.jsx'));
    assert.ok(!isTestFile('some-component.ts'));
    assert.ok(!isTestFile('some-component.tsx'));
    assert.ok(!isTestFile('some-file.mjs'));
    assert.ok(!isTestFile('some-file.cjs'));
    assert.ok(!isTestFile('some-file.mts'));
    assert.ok(!isTestFile('some-file.cts'));
    assert.ok(!isTestFile('my-testing-component.js'));
    assert.ok(!isTestFile('router.js'));
    assert.ok(!isTestFile('my-test.html'));
    assert.ok(!isTestFile('.js.txt'));
  });
});
