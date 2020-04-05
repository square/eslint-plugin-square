# no-assert-ok-find

:fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

Ember's `find('.selector')` test helper function always returns an array, even when no elements match. As a result, `assert.ok(find('.selector'))` will always pass, even if no elements are found, as an empty array is still truthy.

## Rule Details

This rule disallows the aforementioned test assertion.

## Examples

Examples of **incorrect** code for this rule:

```js
test('the element exists', function(assert) {
  assert.ok(find('.selector'));
});
```

Examples of **correct** code for this rule:

```js
test('the element exists', function(assert) {
  assert.equal(find('.selector').length, 1);
});
```

```js
test('the element exists', function(assert) {
  assert.dom('.selector').exists(); // qunit-dom
});
```

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.

## References

* See the [documentation](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#find) for Ember's `find` test helper
* See the [documentation](https://github.com/simplabs/qunit-dom) for the `qunit-dom` package
