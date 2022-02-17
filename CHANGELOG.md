




## v22.0.0 (2022-02-17)

#### :boom: Breaking Change
* [#586](https://github.com/square/eslint-plugin-square/pull/586) Drop ESLint 7 support and enable `es2021` environment ([@bmish](https://github.com/bmish))
* [#588](https://github.com/square/eslint-plugin-square/pull/588) Drop support for old minor versions of Node 12 and 14 ([@bmish](https://github.com/bmish))
* [#587](https://github.com/square/eslint-plugin-square/pull/587) Strictly define Node API ([@bmish](https://github.com/bmish))
* [#582](https://github.com/square/eslint-plugin-square/pull/582) chore(deps): bump eslint-plugin-unicorn from 37.0.1 to 41.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#565](https://github.com/square/eslint-plugin-square/pull/565) Add more async Ember test helpers ([@bmish](https://github.com/bmish))

#### :rocket: Enhancement
* [#589](https://github.com/square/eslint-plugin-square/pull/589) Expose `ASYNC_EMBER_TEST_HELPERS` in public Node API ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v21.0.2 (2022-01-21)

#### :bug: Bug Fix
* [#564](https://github.com/square/eslint-plugin-square/pull/564) Don't require `await` in return statements in `require-await-function` rule ([@fengb](https://github.com/fengb))

#### :house: Internal
* [#545](https://github.com/square/eslint-plugin-square/pull/545) Add GitHub Actions to Dependabot config ([@ddzz](https://github.com/ddzz))

#### Committers: 3
- Benjamin Feng ([@fengb](https://github.com/fengb))
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Darius D. ([@ddzz](https://github.com/ddzz))


## v21.0.1 (2021-12-11)

#### :bug: Bug Fix
* [#540](https://github.com/square/eslint-plugin-square/pull/540) Automatically provide `square` plugin so consumers don't have to specify it ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#533](https://github.com/square/eslint-plugin-square/pull/533) Mention related rule `qunit-dom/no-ok-find` in `square/no-assert-ok-find` rule doc ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#516](https://github.com/square/eslint-plugin-square/pull/516) Add jsdoc `type` annotation to rules ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v21.0.0 (2021-10-21)

#### :boom: Breaking Change
* [#486](https://github.com/square/eslint-plugin-square/pull/486) Support ESLint v8 (includes eslint-plugin-unicorn v37 upgrade) ([@bmish](https://github.com/bmish))
* [#505](https://github.com/square/eslint-plugin-square/pull/505) Drop support below ESLint 7.32 ([@bmish](https://github.com/bmish))
* [#485](https://github.com/square/eslint-plugin-square/pull/485) chore(deps): bump eslint-plugin-prettier from 3.4.0 to 4.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#460](https://github.com/square/eslint-plugin-square/pull/460) chore(deps): bump espree from 7.3.1 to 9.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#502](https://github.com/square/eslint-plugin-square/pull/502) chore(deps): bump @typescript-eslint/eslint-plugin from 4.33.0 to 5.1.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#499](https://github.com/square/eslint-plugin-square/pull/499) chore(deps): bump eslint-plugin-qunit from 6.1.1 to 7.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### :rocket: Enhancement
* [#507](https://github.com/square/eslint-plugin-square/pull/507) Update all dependencies to latest ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#506](https://github.com/square/eslint-plugin-square/pull/506) Test on Node 17 ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v20.0.3 (2021-10-21)

#### :bug: Bug Fix
* [#494](https://github.com/square/eslint-plugin-square/pull/494) Switch to message IDs for reporting violations ([@bmish](https://github.com/bmish))
* [#489](https://github.com/square/eslint-plugin-square/pull/489) Remove unused dependencies `camelcase` and `strip-indent` ([@bmish](https://github.com/bmish))
* [#488](https://github.com/square/eslint-plugin-square/pull/488) Remove unused `estraverse` dependency and `scope-reference-this` util ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#464](https://github.com/square/eslint-plugin-square/pull/464) Add `eslintplugin` keyword in package.json ([@bmish](https://github.com/bmish))
* [#462](https://github.com/square/eslint-plugin-square/pull/462) Improve rules table header and fixable notices ([@bmish](https://github.com/bmish))
* [#445](https://github.com/square/eslint-plugin-square/pull/445) Switch from github emojis to standard emojis ([@bmish](https://github.com/bmish))
* [#431](https://github.com/square/eslint-plugin-square/pull/431) Mention which rules provide suggestions in individual rule docs ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#490](https://github.com/square/eslint-plugin-square/pull/490) Increase required test coverage percentages ([@bmish](https://github.com/bmish))
* [#463](https://github.com/square/eslint-plugin-square/pull/463) Cache dependencies on GitHub Actions to speed up CI ([@ddzz](https://github.com/ddzz))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Darius D. ([@ddzz](https://github.com/ddzz))


## v20.0.2 (2021-06-20)

#### :bug: Bug Fix
* [#418](https://github.com/square/eslint-plugin-square/pull/418) Use `meta.hasSuggestions` for suggestable rules to prepare for ESLint 8 ([@bmish](https://github.com/bmish))

#### :memo: Documentation
* [#429](https://github.com/square/eslint-plugin-square/pull/429) Add disclaimer that this plugin is not recommended for public usage ([@bmish](https://github.com/bmish))
* [#428](https://github.com/square/eslint-plugin-square/pull/428) Mention rules that provide automated suggestions in README rules table ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v20.0.1 (2021-06-04)

#### :bug: Bug Fix
* [#411](https://github.com/square/eslint-plugin-square/pull/411) Fix typo when disabling `unicorn/prefer-prototype-methods` rule ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v20.0.0 (2021-06-02)

#### :boom: Breaking Change
* [#408](https://github.com/square/eslint-plugin-square/pull/408) Drop support for Node 10 and Node 15 ([@bmish](https://github.com/bmish))
* [#405](https://github.com/square/eslint-plugin-square/pull/405) chore(deps): bump eslint-plugin-unicorn to 33.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#406](https://github.com/square/eslint-plugin-square/pull/406) chore(deps): bump eslint-plugin-unicorn to 31.0.0 ([@bmish](https://github.com/bmish))
* [#397](https://github.com/square/eslint-plugin-square/pull/397) Remove rule `no-modifying-immutable-properties` ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#409](https://github.com/square/eslint-plugin-square/pull/409) Use `ecmaVersion` of `2020` for internal tests/linting ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v19.1.0 (2021-05-30)

#### :rocket: Enhancement
* [#388](https://github.com/square/eslint-plugin-square/pull/388) chore(deps): bump eslint-utils from 2.1.0 to 3.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#347](https://github.com/square/eslint-plugin-square/pull/347) feat: add automated suggestion to `no-assert-ok-find` rule ([@bmish](https://github.com/bmish))
* [#348](https://github.com/square/eslint-plugin-square/pull/348) feat: add automated suggestion to `no-test-return-value` rule ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#382](https://github.com/square/eslint-plugin-square/pull/382) Only catch global `find` Ember acceptance test helper in `no-assert-ok-find` rule ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#372](https://github.com/square/eslint-plugin-square/pull/372) Use `requireindex` to export rules and configs ([@bmish](https://github.com/bmish))
* [#346](https://github.com/square/eslint-plugin-square/pull/346) test: add missing error node type assertions in a few tests ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v19.0.2 (2021-03-24)

#### :bug: Bug Fix
* [#340](https://github.com/square/eslint-plugin-square/pull/340) Disable `unicorn/no-array-for-each` rule in `base` config ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v19.0.1 (2021-03-24)

#### :bug: Bug Fix
* [#341](https://github.com/square/eslint-plugin-square/pull/341) Disable `unicorn/no-lonely-if` rule in `base` config ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))


## v19.0.0 (2021-03-22)

#### :boom: Breaking Change
* [#338](https://github.com/square/eslint-plugin-square/pull/338) chore(deps): bump eslint-plugin-unicorn from 28.0.2 to 29.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### Committers: 0


## v18.0.0 (2021-03-18)

#### :boom: Breaking Change
* [#329](https://github.com/square/eslint-plugin-square/pull/329) chore(deps): bump eslint-config-prettier from 6.15.0 to 8.1.0 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#322](https://github.com/square/eslint-plugin-square/pull/322) chore(deps): bump eslint-plugin-unicorn from 23.0.0 to 28.0.2 ([@dependabot[bot]](https://github.com/apps/dependabot))
* [#333](https://github.com/square/eslint-plugin-square/pull/333) chore(deps): bump eslint-plugin-qunit from 5.1.1 to 6.0.0 ([@dependabot[bot]](https://github.com/apps/dependabot))

#### :bug: Bug Fix
* [#291](https://github.com/square/eslint-plugin-square/pull/291) Add missing dependency range carets ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#290](https://github.com/square/eslint-plugin-square/pull/290) Automate release process with release-it-lerna-changelog ([@bmish](https://github.com/bmish))
* [#289](https://github.com/square/eslint-plugin-square/pull/289) Add Windows to CI test matrix ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)


## v17.0.0 (2020-12-02)

#### :boom: Breaking Change
* [#265](https://github.com/square/eslint-plugin-square/pull/265) build(deps): bump eslint-plugin-ember from 9.6.0 to 10.0.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#231](https://github.com/square/eslint-plugin-square/pull/231) build(deps): bump eslint-plugin-unicorn from 22.0.0 to 23.0.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#247](https://github.com/square/eslint-plugin-square/pull/247) Split new `strict` config out of `typescript` config ([@bmish](https://github.com/bmish))
* [#266](https://github.com/square/eslint-plugin-square/pull/266) Enable `qunit/no-assert-equal-boolean` rule in `ember` config ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#267](https://github.com/square/eslint-plugin-square/pull/267) Use more specific path for router.js file override in `ember` config ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v16.0.1 (2020-09-27)

#### :bug: Bug Fix
* [#213](https://github.com/square/eslint-plugin-square/pull/213) Turn off `unicorn/import-style` rule ([@bmish](https://github.com/bmish))
* [#214](https://github.com/square/eslint-plugin-square/pull/214) build(deps): bump eslint-plugin-ember from 9.1.0 to 9.1.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#212](https://github.com/square/eslint-plugin-square/pull/212) build(deps): bump eslint-plugin-import from 2.22.0 to 2.22.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v16.0.0 (2020-09-27)

#### :boom: Breaking Change
* [#209](https://github.com/square/eslint-plugin-square/pull/209) Enable `checkPlainGetters` option on `ember/no-side-effects` rule ([@bmish](https://github.com/bmish))
* [#208](https://github.com/square/eslint-plugin-square/pull/208) Disable `checkInitOnly` and enable `checkNativeClasses` options on `ember/require-super-in-init` rule ([@bmish](https://github.com/bmish))
* [#207](https://github.com/square/eslint-plugin-square/pull/207) Remove `no-for-of` rule ([@bmish](https://github.com/bmish))
* [#206](https://github.com/square/eslint-plugin-square/pull/206) Remove `no-async` rule ([@bmish](https://github.com/bmish))
* [#203](https://github.com/square/eslint-plugin-square/pull/203) Remove `no-focused-tests` rule replaced by `qunit/no-only` rule ([@bmish](https://github.com/bmish))
* [#202](https://github.com/square/eslint-plugin-square/pull/202) Remove `no-test-expect-assertion-count` rule replaced by `qunit/require-expect` rule ([@bmish](https://github.com/bmish))
* [#147](https://github.com/square/eslint-plugin-square/pull/147) Remove `no-lazy-arrow-functions` rule for deprecated qunit-bdd plugin ([@bmish](https://github.com/bmish))
* [#201](https://github.com/square/eslint-plugin-square/pull/201) Add eslint-plugin-qunit to `ember` config ([@bmish](https://github.com/bmish))
* [#195](https://github.com/square/eslint-plugin-square/pull/195) build(deps): bump eslint-plugin-unicorn from 21.0.0 to 22.0.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#200](https://github.com/square/eslint-plugin-square/pull/200) build(deps): bump eslint-plugin-ember from 8.13.0 to 9.1.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#197](https://github.com/square/eslint-plugin-square/pull/197) build(deps): bump @typescript-eslint/eslint-plugin from 3.10.1 to 4.2.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :rocket: Enhancement
* [#198](https://github.com/square/eslint-plugin-square/pull/198) build(deps): bump eslint-plugin-react from 7.20.6 to 7.21.2 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#199](https://github.com/square/eslint-plugin-square/pull/199) build(deps): bump eslint-config-prettier from 6.11.0 to 6.12.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#204](https://github.com/square/eslint-plugin-square/pull/204) Fix false positive in `no-test-return-value` rule ([@bmish](https://github.com/bmish))
* [#192](https://github.com/square/eslint-plugin-square/pull/192) build(deps): bump prettier from 2.1.1 to 2.1.2 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#185](https://github.com/square/eslint-plugin-square/pull/185) Move eslint-plugin-markdown from dependency to dev-dependency ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#189](https://github.com/square/eslint-plugin-square/pull/189) Add sort-package-json ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v15.2.0 (2020-08-26)

#### :rocket: Enhancement
* [#156](https://github.com/square/eslint-plugin-square/pull/156) build(deps): bump eslint-plugin-unicorn from 20.1.0 to 21.0.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#166](https://github.com/square/eslint-plugin-square/pull/166) build(deps): bump estraverse from 5.1.0 to 5.2.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#176](https://github.com/square/eslint-plugin-square/pull/176) build(deps): bump espree from 7.1.0 to 7.3.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#181](https://github.com/square/eslint-plugin-square/pull/181) build(deps): bump eslint-plugin-ember from 8.9.1 to 8.13.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#179](https://github.com/square/eslint-plugin-square/pull/179) build(deps): bump prettier from 2.0.5 to 2.1.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#180](https://github.com/square/eslint-plugin-square/pull/180) build(deps): bump @typescript-eslint/eslint-plugin from 3.6.1 to 3.10.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#170](https://github.com/square/eslint-plugin-square/pull/170) build(deps): bump eslint-plugin-react from 7.20.3 to 7.20.6 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :memo: Documentation
* [#182](https://github.com/square/eslint-plugin-square/pull/182) Mention that the `qunit/require-expect` rule is related to our `no-test-expect-assertion-count` rule ([@bmish](https://github.com/bmish))

#### :house: Internal
* [#148](https://github.com/square/eslint-plugin-square/pull/148) Remove unnecessary `@typescript-eslint/eslint-recommended` in `typescript` config ([@maxbeatty](https://github.com/maxbeatty))
* [#98](https://github.com/square/eslint-plugin-square/pull/98) Use shared prettier config ([@maxbeatty](https://github.com/maxbeatty))
* [#151](https://github.com/square/eslint-plugin-square/pull/151) Add npm-package-json-lint ([@bmish](https://github.com/bmish))
* [#150](https://github.com/square/eslint-plugin-square/pull/150) Add eslint-plugin-markdown ([@bmish](https://github.com/bmish))

#### Committers: 3
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- Max Beatty ([@maxbeatty](https://github.com/maxbeatty))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v15.1.1 (2020-07-02)

#### :bug: Bug Fix
* [#143](https://github.com/square/eslint-plugin-square/pull/143) Disable `filenames/match-exported` rule for certain files in dummy apps / subapps in `ember` config ([@bmish](https://github.com/bmish))

#### Committers: 1
- Bryan Mishkin ([@bmish](https://github.com/bmish))

## v15.1.0 (2020-07-01)

#### :rocket: Enhancement
* [#136](https://github.com/square/eslint-plugin-square/pull/136) build(deps): bump eslint-plugin-import from 2.21.2 to 2.22.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#140](https://github.com/square/eslint-plugin-square/pull/140) build(deps): bump eslint-plugin-ember from 8.8.0 to 8.9.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#139](https://github.com/square/eslint-plugin-square/pull/139) build(deps): bump @typescript-eslint/eslint-plugin from 3.4.0 to 3.5.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#142](https://github.com/square/eslint-plugin-square/pull/142) Disable `filenames/match-exported` rule for certain Ember file types in `ember` config ([@bmish](https://github.com/bmish))
* [#141](https://github.com/square/eslint-plugin-square/pull/141) build(deps): bump eslint-plugin-react from 7.20.2 to 7.20.3 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#137](https://github.com/square/eslint-plugin-square/pull/137) build(deps): bump eslint-plugin-react from 7.20.0 to 7.20.2 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v15.0.0 (2020-06-26)

#### :boom: Breaking Change
* [#130](https://github.com/square/eslint-plugin-square/pull/130) Drop ESLint 5 support ([@bmish](https://github.com/bmish))
* [#128](https://github.com/square/eslint-plugin-square/pull/128) Drop Node 13 support ([@bmish](https://github.com/bmish))
* [#103](https://github.com/square/eslint-plugin-square/pull/103) Enable [filenames/match-exported](https://github.com/selaux/eslint-plugin-filenames#matching-exported-values-match-exported) rule in `base` config ([@bmish](https://github.com/bmish))
* [#123](https://github.com/square/eslint-plugin-square/pull/123) Enable [unicorn/prefer-flat-map](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-flat-map.md) rule in `base` config ([@bmish](https://github.com/bmish))
* [#124](https://github.com/square/eslint-plugin-square/pull/124) Enable [unicorn/prefer-optional-catch-binding](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/master/docs/rules/prefer-optional-catch-binding.md) rule in `base` config ([@bmish](https://github.com/bmish))
* [#121](https://github.com/square/eslint-plugin-square/pull/121) Enable [ember/no-assignment-of-untracked-properties-used-in-tracking-contexts](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-assignment-of-untracked-properties-used-in-tracking-contexts.md) rule in `ember` config ([@bmish](https://github.com/bmish))
* [#131](https://github.com/square/eslint-plugin-square/pull/131) Enable [ember/no-invalid-test-waiters](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-invalid-test-waiters.md) rule in `ember` config ([@bmish](https://github.com/bmish))
* [#127](https://github.com/square/eslint-plugin-square/pull/127) Enable [ember/no-test-this-render](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-test-this-render.md) rule in `ember` config ([@bmish](https://github.com/bmish))
* [#126](https://github.com/square/eslint-plugin-square/pull/126) Enable [ember/prefer-ember-test-helpers](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/prefer-ember-test-helpers.md) rule in `ember` config ([@bmish](https://github.com/bmish))
* [#133](https://github.com/square/eslint-plugin-square/pull/133) Remove custom `no-undef` rule ([@bmish](https://github.com/bmish))

#### :rocket: Enhancement
* [#129](https://github.com/square/eslint-plugin-square/pull/129) Only enable TypeScript linting for `.ts` files in `typescript` config ([@bmish](https://github.com/bmish))
* [#122](https://github.com/square/eslint-plugin-square/pull/122) Enable `useOptionalChaining` option on [ember/no-get](https://github.com/ember-cli/eslint-plugin-ember/blob/master/docs/rules/no-get.md) rule in `ember` config ([@bmish](https://github.com/bmish))
* [#120](https://github.com/square/eslint-plugin-square/pull/120) build(deps): bump eslint-plugin-ember from 8.6.0 to 8.8.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#100](https://github.com/square/eslint-plugin-square/pull/100) build(deps): bump eslint-plugin-import from 2.20.2 to 2.21.1 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :bug: Bug Fix
* [#112](https://github.com/square/eslint-plugin-square/pull/112) build(deps): bump eslint-plugin-prettier from 3.1.3 to 3.1.4 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#109](https://github.com/square/eslint-plugin-square/pull/109) build(deps): bump eslint-plugin-import from 2.21.1 to 2.21.2 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v14.2.0 (2020-06-02)

#### :rocket: Enhancement
* [#96](https://github.com/square/eslint-plugin-square/pull/96) build(deps): bump eslint-plugin-ember from 8.5.2 to 8.6.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#83](https://github.com/square/eslint-plugin-square/pull/83) build(deps): bump eslint-plugin-unicorn from 20.0.0 to 20.1.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#82](https://github.com/square/eslint-plugin-square/pull/82) build(deps): bump eslint-plugin-eslint-comments from 3.1.2 to 3.2.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#80](https://github.com/square/eslint-plugin-square/pull/80) Add new rule [no-restricted-files](https://github.com/square/eslint-plugin-square/blob/master/docs/rules/no-restricted-files.md) ([@bmish](https://github.com/bmish))

#### :bug: Bug Fix
* [#94](https://github.com/square/eslint-plugin-square/pull/94) Fix incorrect rule severity level in `typescript` config ([@bmish](https://github.com/bmish))
* [#88](https://github.com/square/eslint-plugin-square/pull/88) Handle TypeScript files with [no-missing-tests](https://github.com/square/eslint-plugin-square/blob/master/docs/rules/no-missing-tests.md) rule ([@bmish](https://github.com/bmish))
* [#77](https://github.com/square/eslint-plugin-square/pull/77) build(deps): bump eslint-plugin-ember from 8.5.1 to 8.5.2 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :house: Internal
* [#90](https://github.com/square/eslint-plugin-square/pull/90) Ensure rule docs mention all rule configuration options ([@bmish](https://github.com/bmish))

#### Committers: 2
- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

## v14.1.0 (2020-05-19)

#### :rocket: Enhancement

* [#70](https://github.com/square/eslint-plugin-square/pull/70) build(deps): bump eslint-plugin-unicorn from 19.0.1 to 20.0.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
* [#69](https://github.com/square/eslint-plugin-square/pull/69) build(deps): bump eslint-plugin-react from 7.19.0 to 7.20.0 ([@dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

#### :house: Internal

* [#64](https://github.com/square/eslint-plugin-square/pull/64) Update to eslint 7 internally ([@bmish](https://github.com/bmish))

#### Committers: 2

- Bryan Mishkin ([@bmish](https://github.com/bmish))
- [@dependabot-preview[bot]](https://github.com/apps/dependabot-preview)

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
