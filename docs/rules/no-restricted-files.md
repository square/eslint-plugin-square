# no-restricted-files

This rule can be used to disallow files at certain file paths.

## Examples

For example, we may want to disallow unscoped/unnested components, and instead require that each component is nested or scoped within a folder.

Regexp: `app/components/[^/]+$`

Disallows this unscoped component: `app/components/my-component.js`

Allows this scoped component: `app/components/scope/my-component.js`

## Configuration

* object[] -- containing the following properties:
  * string[] -- `paths` -- list of regexp file paths to disallow
  * string -- `error` -- optional custom error message to display for these disallowed file paths
