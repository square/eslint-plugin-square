# eslint-plugin-square

[![npm version](https://badge.fury.io/js/eslint-plugin-square.svg)](https://badge.fury.io/js/eslint-plugin-square)
![CI](https://github.com/square/eslint-plugin-square/workflows/CI/badge.svg)

This plugin contains lint rule definitions and configurations for [ESLint](http://eslint.org) specific to Square's needs. It serves mainly to consolidate Square's web frontend linting setup in one place. It is generally **not recommended for public usage** outside of Square.

## Requirements

* [ESLint](https://eslint.org/) `>= 8.8.0`
* [Node.js](https://nodejs.org/) `12.* || 14.* || >= 16.*`

## Usage

Install via yarn (or npm):

```sh
yarn add --dev eslint-plugin-square
```

Edit your `.eslintrc.js` configuration file to extend one of the available configurations from this plugin:

```js
module.exports = {
  extends: ['plugin:square/base'], // Or other configuration.
};
```

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
