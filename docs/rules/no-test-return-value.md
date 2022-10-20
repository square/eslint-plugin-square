# Disallow test functions with a return value (`square/no-test-return-value`)

🔥 This rule is enabled in the `ember` [config](https://github.com/square/eslint-plugin-square/blob/master/README.md#configurations).

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

For asynchronous tests, use async/await instead of returning a promise.

Some tests may have unnecessary return statements leftover from running [decaffeinate](https://github.com/decaffeinate/decaffeinate).

## Examples

Examples of **incorrect** code for this rule:

```js
test('it does something', function (assert) {
  const thenable = new Promise();
  return thenable;
});
```

```js
test('it does something', function (assert) {
  return assert.ok(something); // unnecessary return
});
```

Examples of **correct** code for this rule:

```js
test('it does something', async function (assert) {
  const thenable = new Promise();
  await thenable;
});
```

```js
test('it does something', function (assert) {
  assert.ok(something);
});
```

## Configuration

- object -- containing the following properties:
  - `String[]` -- `testHooks` -- optional array of test hook names to use (see rule implementation for the default list)
