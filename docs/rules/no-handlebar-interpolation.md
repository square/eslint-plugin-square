# no-handlebar-interpolation

This rule disallows "no-handlebar-interpolation" `{{{` in strings which is assumed to be used to insert unsafe HTML.

Enable this to protect against unescaped HTML being inserted into the DOM, which could open a security hole.

The rule is built to run on i18n files. Please see the following project for more information:
<https://github.com/jamesarosen/ember-i18n/wiki/Doc:-Defining-Translations#defining-translations>

You can provide option, filePatterns, with a list of RegExp's to filter files to be included in the rule.

## Examples

Examples of **incorrect** code for this rule:

```js
// translations/en.module.js
module.exports = {
  'amounts.paidIn': '{{{amount}}} Paid In',
};
```

Examples of **correct** code for this rule:

```js
// translations/en.module.js
module.exports = {
  'amounts.paidIn': '{{amount}} Paid In',
};
```

## Configuration

```js
const config = {
  filePatterns: [
    /\w\w(-\w\w)?\/translations\.js$/,
    /translations\/\w\w(-\w\w)?\.js$/,
  ],
};
```

The RegExp's above matches files with endings such as 'en/translations.js' and 'en-us/translations.js' or 'translations/en.js' and 'translations/en-us.js', respectively.
