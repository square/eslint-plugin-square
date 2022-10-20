# Enforce using `assert.equal(...callCount, ...);` instead of `assert.ok(...calledOnce);` (`square/use-call-count-test-assert`)

💼 This rule is enabled in the following [configs](https://github.com/square/eslint-plugin-square/blob/master/README.md#configurations): 🔥 `ember`, 🔒 `strict`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Using `callCount` rather than the other shortcut count helpers (such as `calledOnce`, `notCalled`) allows the test runner to show the actual number of times the spy was called.

## Rule Details

This lint rule prevents the use of:

- `notCalled`
- `calledOnce`
- `calledTwice`
- `calledThrice`
- `called`

The above do not provide as much information to the test runner.

## Examples

Examples of **incorrect** code for this rule:

```js
test('it works', function (assert) {
  assert.ok(this.spy.calledOnce);
});
```

Examples of **correct** code for this rule:

```js
test('it works', function (assert) {
  assert.equal(this.spy.callCount, 1);
});
```

## Resources

- See the [documentation](https://sinonjs.org/releases/latest/spies/) for spies and their properties
