# Disallow files without a corresponding test file (`square/no-missing-tests`)

<!-- end rule header -->

Ensuring that files have corresponding test files can be helpful towards improving test coverage.

## Rule Details

This rule enforces that the specified files have corresponding test files.

## Examples

Example entry in `overrides` in the `.eslintrc.js` configuration file used to enable this rule:

```js
const config = {
  files: ['app/**/*.{js,ts}'],
  rules: {
    'square/no-missing-tests': [
      'error',
      [
        {
          filePath: `${__dirname}/app`,
          testPaths: [
            `${__dirname}/tests/integration`,
            `${__dirname}/tests/unit`,
          ],
        },
      ],
    ],
  },
};
```

Example implementation file and test file pair that would be enforced:

- `app/components/my-component.js`
- `tests/unit/components/my-component-test.js`

## Migration

There's an autofixer in the rule implementation that can be uncommented as desired.

## Configuration

- object[]
  - string -- `filePath` -- path to files that should have tests
  - string[] -- `testPaths` -- paths to possible test file locations to check
  - boolean -- `hasTestSuffix` -- whether the test files end in `-test` (default true)
