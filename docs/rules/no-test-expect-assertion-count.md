# no-test-expect-assertion-count

:fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

Prevents the use of `expect(n)` to count the number of expected assertions in tests. This rule is in place because `expect(n)` can be a burden to maintain and exposes bad patterns such as nested promise chains.

## Examples

Examples of **incorrect** code for this rule:

```js
test('it works', function(assert) {
  assert.expect(1);
  clickButton('Ok');
  andThen(() => {
    assert.equal(currentURL(), '/');
  });
});
```

Examples of **correct** code for this rule:

```js
test('it works', async function(assert) {
  await clickButton('Ok');
  assert.equal(currentURL(), '/');
});
```

```js
test('it works', async function(assert) {
  assert.expect(0); // Allowed when there are no other assertions.
  await clickButton('Ok');
});
```

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.

## Related Rules

* [require-await-function](./require-await-function.md)
