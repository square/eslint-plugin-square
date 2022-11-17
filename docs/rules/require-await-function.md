# Enforce using `await` with calls to specified functions (`square/require-await-function`)

💼 This rule is enabled in the 🔥 `ember` [config](https://github.com/square/eslint-plugin-square/blob/master/README.md#configurations).

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Some functions are asynchronous and you may want to wait for their code to finish executing before continuing on. The modern `async` / `await` syntax can help you achieve this.

## Rule Details

This lint rule requires that specified functions be called with the `await` keyword. The benefits of this include:

- Ensure code runs in the right (deterministic) order
- Promote cleaner code by reducing unwieldy promise chain usage
- Enforce a consistent way of calling/chaining asynchronous functions

Note: this rule does not require using `await` in return statements or when nested inside other function calls.

## Examples

Code sample:

```js
// Lint rule configuration: ['error', { functions: ['asyncFunc1', 'asyncFunc2'] }]
function doSomethingInvalid() {
  // Invalid because specified functions are missing `await`.
  return asyncFunc1().then(() => {
    return asyncFunc2();
  });
}
async function doSomethingValid() {
  await asyncFunc1();
  await asyncFunc2();
}
```

Here's a code sample demonstrating how it can be especially useful to enforce using the `async` keyword with asynchronous test action / wait helpers to make tests more deterministic and potentially reduce flakiness.

```js
// Lint rule configuration: ['error', { functions: ['click'] }]
test('clicking the button sends the action', function (assert) {
  click('.my-button'); // Invalid usage.
  assert.ok(this.myAction.calledOnce);
});
test('clicking the button sends the action', function (assert) {
  click('.my-button').then(() => {
    assert.ok(this.myAction.calledOnce);
  }); // Invalid usage.
});
test('clicking the button sends the action', async function (assert) {
  await click('.my-button'); // Valid usage.
  assert.ok(this.myAction.calledOnce);
});
```

## Configuration

This rule accepts a single argument:

- Set the required `functions` option to an array of the function names that must be called with `await`.

## Migration

- [async-await-codemod](https://github.com/sgilroy/async-await-codemod) can help convert async function calls / promise chains to use `await`
- [ember-test-helpers-codemod](https://github.com/simonihmig/ember-test-helpers-codemod) has transforms such as [click](https://github.com/simonihmig/ember-test-helpers-codemod/blob/master/transforms/acceptance/transforms/click.js) that can be modified to call `makeAwait()` and `dropAndThen()` on the function calls that you're trying to bring into compliance with this rule

## When Not To Use It

You should avoid enabling this rule if:

- Your JavaScript/browser environment does not support `async` functions (an ES8/ES2017 feature)
- You have no asynchronous functions
- You prefer to use promise chains instead of the `async` keyword

## Related Rules

- [no-await-in-loop](https://eslint.org/docs/rules/no-await-in-loop.md)
- [no-return-await](https://eslint.org/docs/rules/no-return-await.md)
- [require-atomic-updates](https://eslint.org/docs/rules/require-atomic-updates.md)
- [require-await](https://eslint.org/docs/rules/require-await.md)

## Resources

- See the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) for async functions
