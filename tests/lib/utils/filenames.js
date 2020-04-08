'use strict';

const filenames = require('../../../lib/utils/filenames');
const assert = require('assert');

describe('filenames', () => {
  // filenames/match-regex ignores file extension so these tests also do
  // https://github.com/selaux/eslint-plugin-filenames/blob/1.3.0/lib/rules/match-regex.js#L29
  // https://github.com/selaux/eslint-plugin-filenames/blob/1.3.0/lib/common/parseFilename.js#L10
  describe('regex', () => {
    it('supports kebab case', () => {
      const re = new RegExp(filenames.regex.kebab);

      [
        't',
        'foo',
        'foo-bar',
        'foo-bar-baz',
        '1fish',
        '1fish-2fish',
        'type.d',
        'index.test',
        'apple.stories',
        '.eslintrc',
        '.template-lintrc',
      ].forEach((t) => assert.ok(re.test(t), `expected '${t}' to be ok`));

      ['snake_case', 'camelCase', 'PascalCase'].forEach((t) =>
        assert.ok(!re.test(t), `expected ${t} to NOT be ok`)
      );
    });

    it('supports pascal case', () => {
      const re = new RegExp(filenames.regex.pascal);

      ['A', 'App', 'PascalCase', 'FooBarBaz', 'App.test'].forEach((t) =>
        assert.ok(re.test(t), `expected '${t}' to be ok`)
      );

      ['simple', 'snake_case', 'kebab-case', 'dot.case'].forEach((t) =>
        assert.ok(!re.test(t), `expected ${t} to NOT be ok`)
      );
    });
  });
});
