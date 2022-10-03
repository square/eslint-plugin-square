# Disallow usage of `assert.ok(find(...))` as it will always pass (`square/no-assert-ok-find`)

💼 This rule is enabled in the following configs: `ember`.

💡 This rule provides [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions) that can be applied manually.

<!-- end rule header -->

🔥 The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

💡 Some problems reported by this rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

Ember's old built-in `find('.selector')` acceptance test helper function always returns an array, even when no elements match. As a result, `assert.ok(find('.selector'))` will always pass, even if no elements are found, as an empty array is still truthy.

Note: [find](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#find) from `@ember/test-helpers` does not have this problem.

## Rule Details

This rule disallows the aforementioned test assertion.

## Examples

Examples of **incorrect** code for this rule:

```js
test('the element exists', function (assert) {
  assert.ok(find('.selector'));
});
```

Examples of **correct** code for this rule:

```js
test('the element exists', function (assert) {
  assert.equal(find('.selector').length, 1);
});
```

```js
test('the element exists', function (assert) {
  assert.dom('.selector').exists(); // qunit-dom
});
```

```js
import { find } from '@ember/test-helpers';

test('the element exists', function (assert) {
  assert.ok(find('.selector'));
});
```

## References

- See the [documentation](https://guides.emberjs.com/v2.14.0/testing/acceptance/) for Ember's `find` acceptance test helper
- See the [documentation](https://github.com/simplabs/qunit-dom) for the `qunit-dom` package
- Related rule: [qunit-dom/no-ok-find](https://github.com/simplabs/eslint-plugin-qunit-dom/blob/main/rules/no-ok-find.md)
