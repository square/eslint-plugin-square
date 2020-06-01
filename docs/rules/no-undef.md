# no-undef (fixable)

This file was [copied](https://github.com/eslint/eslint/blob/6e9ff08cf8ac9188331fcea7905ce162accefe81/lib/rules/no-undef.js) from the official eslint repo in order to add fixing undefined variables by adding imports in some situations. You can disable the original [no-undef](https://eslint.org/docs/rules/no-undef) rule and enable this one as desired.

## Examples

Examples of **incorrect** code for this rule:

```js
// test is defined globally

test('it does something', function() {});
```

Examples of **correct** code for this rule:

```js
import { test } from 'qunit';

test('it does something', function() {});
```

## Configuration

Example:

```json
{
  "imports": [
    { "global": "Ember", "path": "ember" },
    { "global": "module", "path": "qunit", "named": true },
    { "global": "test", "path": "qunit", "named": true }
  ]
}
```

There's also a [typeof](https://eslint.org/docs/rules/no-undef#typeof) from the original rule.
