const {
  parse: babelESLintParse,
} = require('../../helpers/babel-eslint-parser');
const { FauxContext } = require('../../helpers/faux-context');
const importUtils = require('../../../lib/utils/import');
const assert = require('node:assert');

/**
 * @param {string} code
 * @returns {import('estree').CallExpression}
 */
function parseCallExpression(code) {
  const parsed = babelESLintParse(code);
  if (
    parsed.body[0].type === 'ExpressionStatement' &&
    parsed.body[0].expression.type === 'CallExpression'
  ) {
    return parsed.body[0].expression;
  }
  throw new Error(
    'Expected first statement in body to be an ExpressionStatement of a CallExpression.'
  );
}

describe('getSourceModuleNameForIdentifier', () => {
  it('gets the correct module name from an imported method', () => {
    const context = new FauxContext(
      "import { someMethod } from 'some-service';"
    );
    const node = parseCallExpression('someMethod()').callee;
    assert.strictEqual(
      importUtils.getSourceModuleNameForIdentifier(context, node),
      'some-service'
    );
  });

  it('gets the correct module name from an imported aliased method', () => {
    const context = new FauxContext(
      "import { someMethod as aliasMethod } from 'some-service';"
    );
    const node = parseCallExpression('aliasMethod()').callee;
    assert.strictEqual(
      importUtils.getSourceModuleNameForIdentifier(context, node),
      'some-service'
    );
  });
});

describe('getSourceModuleName', () => {
  it('gets the correct module name with MemberExpression', () => {
    const node = parseCallExpression('DS.Model.extend()').callee;
    assert.strictEqual(importUtils.getSourceModuleName(node), 'DS');
  });

  it('gets the correct module name with Identifier', () => {
    const node = parseCallExpression('Model.extend()').callee;
    assert.strictEqual(importUtils.getSourceModuleName(node), 'Model');
  });

  it('gets the correct module name with CallExpression', () => {
    const node = parseCallExpression('Model.extend()');
    assert.strictEqual(importUtils.getSourceModuleName(node), 'Model');
  });

  it('throws error when undefined node is passed in', () => {
    try {
      const node = undefined;
      importUtils.getSourceModuleName(node);
    } catch (/** @type {any} */ err) {
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
      undefined
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
