## v14.0.0 (2020-05-06)

#### :boom: Breaking Change
* [#41](https://github.com/square/eslint-plugin-square/pull/41) Enable most [eslint-plugin-unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn) recommended rules in `base` configuration ([@bmish](https://github.com/bmish))
* [#62](https://github.com/square/eslint-plugin-square/pull/62) Enable `catchRouterMicrolib` option on [ember/no-private-routing-service](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-private-routing-service.md) rule ([@bmish](https://github.com/bmish))
* [#42](https://github.com/square/eslint-plugin-square/pull/42) Enforce kebab-case filenames in `base` configuration ([@maxbeatty](https://github.com/maxbeatty))
* [#40](https://github.com/square/eslint-plugin-square/pull/40) Move [sort-vars](https://eslint.org/docs/rules/sort-vars) rule to `base` configuration ([@bmish](https://github.com/bmish))

#### :rocket: Enhancement
* [#61](https://github.com/square/eslint-plugin-square/pull/61) build(deps): bump eslint-plugin-ember from [8.4.0](https://github.com/ember-cli/eslint-plugin-ember/releases/tag/v8.4.0) to [8.5.0](https://github.com/ember-cli/eslint-plugin-ember/releases/tag/v8.5.0) ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#49](https://github.com/square/eslint-plugin-square/pull/49) Update warning for [@typescript-eslint/no-unused-vars](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md) rule in `typescript` configuration ([@alexandersmanning](https://github.com/alexandersmanning))

#### :house: Internal
* [#57](https://github.com/square/eslint-plugin-square/pull/57) Begin testing under Node 14 ([@bmish](https://github.com/bmish))

#### Committers: 4
- Alex Manning ([@alexandersmanning](https://github.com/alexandersmanning))
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Max Beatty ([@maxbeatty](https://github.com/maxbeatty))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v13.3.0 (2020-04-16)

#### :rocket: Enhancement
* [#45](https://github.com/square/eslint-plugin-square/pull/45) build(deps): bump @typescript-eslint/eslint-plugin from 2.27.0 to 2.28.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#48](https://github.com/square/eslint-plugin-square/pull/48) build(deps): bump eslint-plugin-ember from 8.2.0 to 8.4.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#47](https://github.com/square/eslint-plugin-square/pull/47) build(deps): bump estraverse from 5.0.0 to 5.1.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#44](https://github.com/square/eslint-plugin-square/pull/44) build(deps): bump eslint-plugin-prettier from 3.1.2 to 3.1.3 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### Committers: 1
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v13.2.4 (2020-04-10)

#### :bug: Bug Fix
* [#38](https://github.com/square/eslint-plugin-square/pull/38) Export filename regex utils ([@bmish](https://github.com/bmish))
* [#39](https://github.com/square/eslint-plugin-square/pull/39) Kebab-case filename restrictions should allow single-character filenames ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#32](https://github.com/square/eslint-plugin-square/pull/32) Update each rule doc to mention what config enables the rule ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v13.2.3 (2020-04-03)

#### :bug: Bug Fix
* [#30](https://github.com/square/eslint-plugin-square/pull/30) Fix filename regex inconsistencies ([@maxbeatty](https://github.com/maxbeatty))

#### :house: Internal
* [#31](https://github.com/square/eslint-plugin-square/pull/31) Add tests to ensure configs are exported and mentioned in README ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Max Beatty ([@maxbeatty](https://github.com/maxbeatty))

## v13.2.2 (2020-04-03)

#### :bug: Bug Fix
* [#27](https://github.com/square/eslint-plugin-square/pull/27) Tweak filename regexes and other rules in `react` config ([@ghaagsma](https://github.com/ghaagsma))
* [#28](https://github.com/square/eslint-plugin-square/pull/28) Disable `no-useless-constructor` rule in `typescript` config ([@maxbeatty](https://github.com/maxbeatty))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Gerald Haagsma ([@ghaagsma](https://github.com/ghaagsma))
- Max Beatty ([@maxbeatty](https://github.com/maxbeatty))

## v13.2.1 (2020-04-01)

#### :bug: Bug Fix
* [#25](https://github.com/square/eslint-plugin-square/pull/25) Allow PascalCase component filenames in `react` config ([@ghaagsma](https://github.com/ghaagsma))

#### Committers: 1
- Gerald Haagsma ([@ghaagsma](https://github.com/ghaagsma))

## v13.2.0 (2020-04-01)

#### :rocket: Enhancement
* [#22](https://github.com/square/eslint-plugin-square/pull/22) Add `react` configuration ([@ghaagsma](https://github.com/ghaagsma))

#### :memo: Documentation
* [#24](https://github.com/square/eslint-plugin-square/pull/24) Mention the criteria that rules should meet to be enabled in our configurations ([@bmish](https://github.com/bmish))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Gerald Haagsma ([@ghaagsma](https://github.com/ghaagsma))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v13.1.0 (2020-03-28)

#### :rocket: Enhancement
* [#14](https://github.com/square/eslint-plugin-square/pull/14) Bump eslint-plugin-ember from 7.11.1 to 8.0.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#6](https://github.com/square/eslint-plugin-square/pull/6) Add `typescript` config ([@maxbeatty](https://github.com/maxbeatty))

#### :house: Internal
* [#13](https://github.com/square/eslint-plugin-square/pull/13) Runs tests under eslint 5 (in addition to eslint 6) ([@bmish](https://github.com/bmish))
* [#10](https://github.com/square/eslint-plugin-square/pull/10) Begin testing under Node 13 ([@bmish](https://github.com/bmish))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Max Beatty ([@maxbeatty](https://github.com/maxbeatty))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v13.0.0 (2020-03-23)

First public release.
