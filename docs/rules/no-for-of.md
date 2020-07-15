# no-for-of

This rule disallows for-of loops. The primary reasons one might want to enable this rule are that when transformed into ES5 using babel, they:

1. use `Symbol`, which may require a polyfill
2. generate a lot of scaffolding code

Until for-of loops are supported natively by almost all the browsers still in use, this rule can be used to disable their use.

## Examples

Examples of **incorrect** code for this rule:

```js
for (const element of array1) {
  console.log(element);
}
```

Examples of **correct** code for this rule:

```js
// eslint-disable-next-line unicorn/no-for-loop
for (let i = 0; i < array1.length; i++) {
  const element = array1[i];
  console.log(element);
}
```
