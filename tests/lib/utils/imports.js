const {
  parse: babelESLintParse,
} = require('../../helpers/babel-eslint-parser');
const { FauxContext } = require('../../helpers/faux-context');
const importUtils = require('../../../lib/utils/import');
const assert = require('assert');

function parse(code) {
  return babelESLintParse(code).body[0].expression;
}

describe('getSourceModuleNameForIdentifier', () => {
  it('gets the correct module name from an imported method', () => {
    const context = new FauxContext(
      "import { someMethod } from 'some-service';"
    );
    const node = parse('someMethod()').callee;
    assert.strictEqual(
      importUtils.getSourceModuleNameForIdentifier(context, node),
      'some-service'
    );
  });

  it('gets the correct module name from an imported aliased method', () => {
    const context = new FauxContext(
      "import { someMethod as aliasMethod } from 'some-service';"
    );
    const node = parse('aliasMethod()').callee;
    assert.strictEqual(
      importUtils.getSourceModuleNameForIdentifier(context, node),
      'some-service'
    );
  });
});

describe('getSourceModuleName', () => {
  it('gets the correct module name with MemberExpression', () => {
    const node = parse('DS.Model.extend()').callee;
    assert.strictEqual(importUtils.getSourceModuleName(node), 'DS');
  });

  it('gets the correct module name with Identifier', () => {
    const node = parse('Model.extend()').callee;
    assert.strictEqual(importUtils.getSourceModuleName(node), 'Model');
  });

  it('gets the correct module name with CallExpression', () => {
    const node = parse('Model.extend()');
    assert.strictEqual(importUtils.getSourceModuleName(node), 'Model');
  });

  it('throws error when undefined node is passed in', () => {
    try {
      const node = undefined;
      importUtils.getSourceModuleName(node);
    } catch (err) {
      assert.strictEqual(
        err.message,
        '`getSourceModuleName` should only be called on a `CallExpression`, `MemberExpression` or `Identifier`'
      );
      assert.strictEqual(err.actual, false);
    }
  });
});

describe('getImportIdentifier', () => {
  it('gets null when no import is found', () => {
    const node = babelESLintParse("import { later } from '@ember/runloop';")
      .body[0];
    assert.strictEqual(
      importUtils.getImportIdentifier(node, '@ember/object', 'action'),
      null
    );
  });

  it('gets an identifier when found', () => {
    const node = babelESLintParse("import { later } from '@ember/runloop';")
      .body[0];
    const identifier = importUtils.getImportIdentifier(
      node,
      '@ember/runloop',
      'later'
    );

    assert.strictEqual(identifier, 'later');
  });

  it('gets an aliased identifier when found', () => {
    const node = babelESLintParse(
      "import { later as laterz } from '@ember/runloop';"
    ).body[0];
    const identifier = importUtils.getImportIdentifier(
      node,
      '@ember/runloop',
      'later'
    );

    assert.strictEqual(identifier, 'laterz');
  });

  it('returns undefined when no default import is found', () => {
    const node = babelESLintParse("import { later } from '@ember/runloop';")
      .body[0];
    const identifier = importUtils.getImportIdentifier(node, '@ember/runloop');

    assert.strictEqual(identifier, undefined);
  });

  it('gets an identifier when found for default imports', () => {
    const node = babelESLintParse("import Component from '@ember/component';")
      .body[0];
    const identifier = importUtils.getImportIdentifier(
      node,
      '@ember/component'
    );

    assert.strictEqual(identifier, 'Component');
  });

  it('gets an named identifier when found with mixed imports', () => {
    const node = babelESLintParse("import { later } from '@ember/runloop';")
      .body[0];
    const identifier = importUtils.getImportIdentifier(
      node,
      '@ember/runloop',
      'later'
    );

    assert.strictEqual(identifier, 'later');
  });

  it('gets a default identifier when found with mixed imports', () => {
    const node = babelESLintParse("import Component from '@ember/component';")
      .body[0];
    const identifier = importUtils.getImportIdentifier(
      node,
      '@ember/component'
    );

    assert.strictEqual(identifier, 'Component');
  });
});
