# no-lazy-arrow-functions (fixable)

:fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

When people use arrow functions in their [qunit-bdd](https://github.com/square/qunit-bdd) `lazy` test variables, they often run into issues where they try to use `this` for the test context and it doesn't work.

## Examples

Examples of **incorrect** code for this rule:

```js
lazy('user', () => {
  return {
    countryCode: this.countryCode,
    currentLanguage: 'en',
  };
});
```

Examples of **correct** code for this rule:

```js
lazy('user', function () {
  return {
    countryCode: this.countryCode,
    currentLanguage: 'en',
  };
});
```
