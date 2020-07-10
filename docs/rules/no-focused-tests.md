# no-focused-tests

:fire: The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

[only](https://api.qunitjs.com/QUnit/only) can be useful when debugging tests, but merging a test case with it can prevent CI from running other tests.

This rule handles the following test hooks:

* `describe`
* `context`
* `it`

Inspired by [no-focused-tests](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-focused-tests.md) from eslint-plugin-jest.

## Examples

Examples of **incorrect** code for this rule:

```js
it.only('foo', () => {});
```
