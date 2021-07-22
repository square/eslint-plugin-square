# use-ember-find (fixable)

🔥 The `"extends": "plugin:square/ember"` property in a configuration file enables this rule.

It is preferred to use Ember test helpers like `find(selector)` instead of jQuery for selecting elements in tests.

## Rule Details

This rule disallows jQuery for selecting elements in tests.

Due to its straightforward migration path, this rule can help serve as an incremental step towards eliminating all jQuery usage.

## Examples

Examples of **incorrect** code for this rule:

```js
$('.my-selector');
```

```js
jQuery('.my-selector');
```

Examples of **correct** code for this rule:

```js
find('.my-selector');
```

## Related Rules

* [no-jquery](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-jquery.md)

## References

* See the [documentation](https://github.com/emberjs/ember-test-helpers/blob/master/API.md#find) for Ember's `find` test helper
* See the [Ember Application Tests](https://guides.emberjs.com/release/testing/acceptance/) guide
