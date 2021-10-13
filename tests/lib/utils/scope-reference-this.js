'use strict';

const assert = require('assert');
const parse = require('espree').parse;
const scopeReferencesThis = require('../../../lib/utils/scope-references-this');

function p(code) {
  return parse(code, { ecmaVersion: 2020 });
}

describe('scopeReferencesThis', function () {
  it('recognizes simple cases`', function () {
    assert.ok(scopeReferencesThis(p('this')), '`this` uses `this`');
    assert.ok(
      !scopeReferencesThis(p('"this"')),
      'the string "this" does not use this'
    );
    assert.ok(
      !scopeReferencesThis('class Foo { @someDecorator() someProp }'),
      'Does not throw with node type (ClassProperty) not handled by estraverse'
    );
  });

  it('can find nested `this`', function () {
    assert.ok(
      scopeReferencesThis(p('if (a) { this } else { null }')),
      'if statement uses this'
    );
    assert.ok(
      scopeReferencesThis(p('() => this')),
      'arrow function uses outer this'
    );
  });

  it('does not consider `this` within non-arrow functions', function () {
    assert.ok(
      !scopeReferencesThis(p('function foo() { return this; }')),
      'function uses different this'
    );
    assert.ok(
      !scopeReferencesThis(p('function foo() { return () => this; }')),
      'inner arrow function uses different this'
    );
    assert.ok(
      !scopeReferencesThis(p('() => function() { return this; }')),
      'inner function uses different this'
    );
    assert.ok(
      !scopeReferencesThis(
        p('({ a() { this } })'),
        'object method uses different this'
      )
    );
  });
});
