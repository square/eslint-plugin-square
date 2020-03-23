# no-async

Allows selectively disabling `async`/`await`. For a production application that needs to support older browsers, you may want to disable them in application code but allow them in tests. Ember's acceptance tests make heavy use of promises and so are a natural fit for `async` functions.

Once all the browsers you support have support for generators, you can turn `async` on for application code too. Until then, the extra runtime cost may not be worth enabling generator-less `async`.

## Rule Details

This rule disallows the use of async functions.

## Examples

Examples of **incorrect** code for this rule:

```js
async function makeCall() {
  const result = await resolveAfter2Seconds();
  console.log(result);
}
```

Examples of **correct** code for this rule:

```js
function makeCall() {
  const result = resolveAfter2Seconds().then(() => {
    console.log(result);
  });
}
```
