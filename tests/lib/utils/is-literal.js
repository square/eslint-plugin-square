'use strict';

const assert = require('assert');
const parse = require('espree').parse;
const isLiteral = require('../../../lib/utils/is-literal');

describe('isLiteral', function () {
  it('treats numbers as literals', function () {
    assert.ok(isLiteral(p('0')), '0 is literal');
    assert.ok(isLiteral(p('NaN')), 'NaN is literal');
  });

  it('treats booleans as literals', function () {
    assert.ok(isLiteral(p('true')), 'true is literal');
    assert.ok(isLiteral(p('false')), 'false is literal');
  });

  it('treats arrays with literal elements as literals', function () {
    assert.ok(isLiteral(p('[]')), 'empty array is literal');
    assert.ok(isLiteral(p('[0]')), 'array with number is literal');
    assert.ok(
      !isLiteral(p('[function() {}]')),
      'array with function is not literal'
    );
  });

  it('treats objects with literal values as literals', function () {
    assert.ok(isLiteral(p('({})')), 'empty object is literal');
    assert.ok(isLiteral(p('({a: 0})')), 'object with number value is literal');
    assert.ok(
      isLiteral(p('({[0]: "foo"})')),
      'object with computed literal key is literal'
    );
    assert.ok(
      !isLiteral(p('({create() {}})')),
      'object with method is not literal'
    );
  });

  it('treats null and undefined as literals', function () {
    assert.ok(isLiteral(p('null')), 'null is literal');
    assert.ok(isLiteral(p('undefined')), 'undefined is literal');
  });
});

function p(code) {
  return parse(code, { ecmaVersion: 2021 }).body[0].expression;
}
