# no-restricted-files

This rule can be used to disallow files at certain file paths.

## Examples

Example `.eslintrc.js` using the rule's `paths` option for matching files based on a regexp pattern:

```js
module.exports = {
  rules: {
    'square/no-restricted-files': [
      'error',
      {
        paths: ['app/components/[^/]+$'],
        message: 'Use a nested scope instead of adding new components to the top-level components folder.',
      },
    ]
  }
};
```

Example `.eslintrc.js` using ESLint's built-in [overrides feature](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#configuration-based-on-glob-patterns) for matching files based on a glob pattern:

```js
module.exports = {
  overrides: [
    {
      files: ['bad/place/to/add/js/files/**/*.js'],
      rules: {
        'square/no-restricted-files': ['error', [{ message: 'Do not add JS files here for x reason.' }]],
      },
    },
  ],
};
```

## Configuration

* object[] -- containing the following properties:
  * string[] -- `paths` -- optional list of regexp file paths to disallow (if you want to use glob patterns, use ESLint's built-in [glob pattern overrides feature](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#configuration-based-on-glob-patterns) instead of this)
  * string -- `message` -- optional custom error message to display for these disallowed file paths

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.
