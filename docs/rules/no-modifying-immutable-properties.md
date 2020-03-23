# no-modifying-immutable-properties (fixable)

There are some properties, especially globally-injected ones, that you may want to treat as read-only, and ensure that no one modifies them.

## Rule Details

This rule prevents modifying the specified properties.

It also disallows using computed property macros like `alias` and `reads` that enable the specified properties to be indirectly modified.

## Examples

All examples assume a configuration of `properties: ['currentUser']`.

Examples of **incorrect** code for this rule:

```js
import { alias, reads } from '@ember/object/computed';

export default Component.extend({
    somePermission1: alias('currentUser.somePermission1'),
    somePermission2: reads('currentUser.somePermission2')
});
```

```js
this.set('currentUser.somePermission', true);
```

Examples of **correct** code for this rule:

```js
import { readOnly } from '@ember/object/computed';

export default Component.extend({
    somePermission: readOnly('currentUser.somePermission')
});
```

```js
const somePermission = this.currentUser.somePermission;
```

## Configuration

* object -- containing the following properties:
  * `String[]` -- `properties` -- array of property names that should be treated as immutable
