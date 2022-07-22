'use strict';

const isTestFile = require('../../../lib/utils/is-test-file');
const assert = require('node:assert');

describe('isTestFile', () => {
  it('detects test files', () => {
    assert.ok(isTestFile('some-test.js'));
    assert.ok(isTestFile('some-test.ts'));
  });

  it('does not detect other files', () => {
    assert.ok(!isTestFile('some-component.js'));
    assert.ok(!isTestFile('my-testing-component.js'));
    assert.ok(!isTestFile('router.js'));
    assert.ok(!isTestFile('my-test.html'));
  });
});
