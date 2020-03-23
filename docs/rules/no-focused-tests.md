# no-focused-tests

[only](https://api.qunitjs.com/QUnit/only) can be useful when debugging tests, but merging a test case with it can prevent CI from running other tests.

This rule handles the following [qunit-bdd](https://github.com/square/qunit-bdd) test hooks:

* `describe`
* `context`
* `it`

Inspired by [no-focused-tests](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-focused-tests.md) from eslint-plugin-jest.

## Examples

Examples of **incorrect** code for this rule:

```js
it.only('foo', () => {});
```
