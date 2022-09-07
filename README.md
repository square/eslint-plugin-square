# eslint-plugin-square

[![npm version](https://badge.fury.io/js/eslint-plugin-square.svg)](https://badge.fury.io/js/eslint-plugin-square)
![CI](https://github.com/square/eslint-plugin-square/workflows/CI/badge.svg)

This plugin contains lint rule definitions and configurations for [ESLint](http://eslint.org) specific to Square's needs. It serves mainly to consolidate Square's web frontend linting setup in one place. It is generally **not recommended for public usage** outside of Square.

## Requirements

* [ESLint](https://eslint.org/) `>= 8.18.0`
* [Node.js](https://nodejs.org/) `^14.18.0 || ^16.0.0 || >= 18.0.0`

## Usage

Install alongside ESLint via yarn (or npm):

```sh
yarn add --dev eslint eslint-plugin-square npm-run-all
```

Edit your `.eslintrc.js` configuration file to extend one of the available configurations from this plugin and [detect unused disable directives](https://eslint.org/docs/latest/user-guide/configuring/rules#report-unused-eslint-disable-comments):

```js
module.exports = {
  reportUnusedDisableDirectives: true,
  extends: ['plugin:square/base'], // Or other configuration.
};
```

Add the relevant lint scripts in `package.json` with [npm-run-all](https://github.com/mysticatea/npm-run-all):

```json
{
  "scripts": {
    "lint": "npm-run-all --continue-on-error --aggregate-output --parallel lint:*",
    "lint:js": "eslint --report-unused-disable-directives --cache ."
  }
}
```

Configure linting to run:

* With the ESLint extension for your IDE
* In your precommit hook (see [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky))
* As a build check during CI (in case IDE warnings or the precommit hook are bypassed)

Fix violations using:

* Lint rule autofixers (`eslint --fix`)
* Lint rule suggestions (a fixer option provided by some rules on highlighted violations in IDEs)
* Codemods (sometimes provided for larger codebase transformations)
* Find-and-replace (with RegExp if necessary)
* Manual fixes

Sometimes, you may not want to fix certain violations, for reasons such as:

* Some code is too risky to change
* A rule may have too many violations and fixing is too tedious / manual
* A rule may have false positives and flag legitimate code
* A rule may not apply in all circumstances (such as a rule that is only useful for test code)
* You may prefer to follow different conventions/styles in your codebase
* You may want to follow-up later to address a specific rule in its own PR

If you prefer not to adopt a specific rule, you can disable it:

* Globally (in the global configuration file)
* In specific directories (in an override in the global configuration file)
* In specific files or on specific lines using comments (`// eslint-disable-line no-empty-function`)

## Configurations

|     | Name | Description |
| --- | --- | --- |
| | [base] | Rules and configuration for any JavaScript-based project. Includes recommended and optional rules from [eslint], [prettier], [eslint-plugin-eslint-comments], [eslint-plugin-import], [eslint-plugin-unicorn], and more. |
| 🔥 | [ember] | [Ember.js]-specific additions on top of `base`. Includes recommended and optional rules from [eslint-plugin-ember], kebab-case filename enforcement with [eslint-plugin-filenames], and more. |
| | [react] | [React](https://reactjs.org)-specific additions on top of `base`. |
| | [strict] | A variety of stricter lint rules on top of `base`. |
| | [typescript] | [TypeScript](https://www.typescriptlang.org/)-specific additions on top of `base`. Use with [@typescript-eslint/parser]. |

Rules enabled by these configurations should meet the following criteria:

* They make sense in a wide variety of codebases (and have been tested in a variety of Square's applications).
* They are generally acceptable and desirable (in terms of enforcing best practices, consistency, avoiding bugs) to most developers.
* There is a practical migration path (autofixers, codemod, find-and-replace, manual fixes) for enabling them in most applications.

## Custom rules

Each rule has emojis denoting:

* What configuration it belongs to
* 🔧 if some problems reported by the rule are automatically fixable by the `--fix` [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) option
* 💡 if some problems reported by the rule are manually fixable by editor [suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

| Name    | Category | 🔥 | 🔧 | 💡 |
| :------ | :------- | :-- | :-- | :-- |
| [no-assert-ok-find](docs/rules/no-assert-ok-find.md) | Ember Testing | 🔥 | | 💡 |
| [no-handlebar-interpolation](docs/rules/no-handlebar-interpolation.md) | Ember | | | |
| [no-missing-tests](docs/rules/no-missing-tests.md) | Testing | | | |
| [no-restricted-files](docs/rules/no-restricted-files.md) | JavaScript | | | |
| [no-test-return-value](docs/rules/no-test-return-value.md) | Testing | 🔥 | | 💡 |
| [no-translation-key-interpolation](docs/rules/no-translation-key-interpolation.md) | Ember | 🔥 | | |
| [require-await-function](docs/rules/require-await-function.md) | JavaScript | 🔥 | 🔧 | |
| [use-call-count-test-assert](docs/rules/use-call-count-test-assert.md) | Testing | 🔥 | 🔧 | |
| [use-ember-find](docs/rules/use-ember-find.md) | Ember Testing | 🔥 | 🔧 | |

Note that we prefer to upstream our custom lint rules to third-party ESLint plugins whenever possible. The rules that still remain here are typically here because:

* We haven't found the appropriate ESLint plugin to upstream them to.
* We haven't found the time to upstream them.
* They are specific to Square in some way / not generic enough.

If you do need to write a custom lint rule here because you can't find an existing lint rule to use or other ESLint plugin to contribute to, be sure to consult [astexplorer.net](https://astexplorer.net/) while writing it.

Lint rule ideas often come from:

* A source of frequent "nit" comments in PRs
* Common issues that newcomers stumble on
* Code that indicates a bug, mistake, or bad practice
* Inconsistencies throughout the codebase
* Outdated / obsolete / legacy code

[base]: lib/config/base.js
[ember]: lib/config/ember.js
[Ember.js]: https://www.emberjs.com/
[eslint]: https://eslint.org/
[eslint-plugin-ember]: https://github.com/ember-cli/eslint-plugin-ember
[eslint-plugin-eslint-comments]: https://github.com/mysticatea/eslint-plugin-eslint-comments
[eslint-plugin-filenames]: https://github.com/selaux/eslint-plugin-filenames
[eslint-plugin-import]: https://github.com/benmosher/eslint-plugin-import
[eslint-plugin-unicorn]: https://github.com/sindresorhus/eslint-plugin-unicorn
[prettier]: https://prettier.io/
[react]: lib/config/react.js
[strict]: lib/config/strict.js
[typescript]: lib/config/typescript.js
[@typescript-eslint/parser]: https://www.npmjs.com/package/@typescript-eslint/parser

## Related

Consider adding other linters not included by plugin:

* [check-dependency-version-consistency](https://github.com/bmish/check-dependency-version-consistency) for monorepos
* [commitlint](https://github.com/conventional-changelog/commitlint)
* [ember-template-lint](https://github.com/ember-template-lint/ember-template-lint) for handlebars files
* [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown) for markdown code samples
* [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node) for Node files
* [markdownlint-cli](https://github.com/igorshubovych/markdownlint-cli) for markdown documentation formatting
* [npm-package-json-lint](https://github.com/tclindner/npm-package-json-lint) for package.json
* [stylelint](https://github.com/stylelint/stylelint) for CSS files

## License

```plaintext
Copyright 2020 Square Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
