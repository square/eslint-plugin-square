# no-missing-tests

Ensuring that certain types of files, such as components, have corresponding test files can be helpful towards improving test coverage.

## Rule Details

This rule enforces that the specified files have corresponding test files.

TODO: this rule currently does not support `.ts` files, it only supports `.js` files.

## Examples

Example configuration:

```js
{
  files: ['app/components/**/*.js'],
  excludedFiles: ['**/*/svgs/**/*', '**/*/svg/**/*'],
  rules: {
    'square/no-missing-tests': ['error', [
      {
        filePath: `${__dirname}/app/components`,
        testPaths: [`${__dirname}/tests/integration/components`, `${__dirname}/tests/unit/components`]
      }
    ]]
  }
}
```

Example files:

* `app/components/my-component.js`
* `tests/unit/components/my-component-test.js`

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.

## Configuration

* object[]
  * string -- `filePath` -- path to files that should have tests
  * string[] -- `testPaths` -- paths to possible test file locations to check
  * boolean -- `hasTestSuffix` -- whether the test files end in `-test` (default true)
