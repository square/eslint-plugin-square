# no-test-return-value

:fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

This rule disallows test functions with return values.

For asynchronous tests, use async/await instead of returning a promise.

Some tests may have unnecessary return statements leftover from running [decaffeinate](https://github.com/decaffeinate/decaffeinate).

## Examples

Examples of **incorrect** code for this rule:

```js
test('it does something', function(assert) {
  const thenable = new Promise();
  return thenable;
});
```

```js
test('it does something', function(assert) {
  return assert.ok(something); // unnecessary return
});
```

Examples of **correct** code for this rule:

```js
test('it does something', async function(assert) {
  const thenable = new Promise();
  await thenable;
});
```

```js
test('it does something', function(assert) {
  assert.ok(something);
});
```

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.

## Configuration

* object -- containing the following properties:
  * `String[]` -- `testHooks` -- optional array of test hook names to use (see rule implementation for the default list)
