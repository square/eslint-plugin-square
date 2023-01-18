/* eslint filenames/match-exported:"off" */

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  configEmoji: [
    ['base', '✅'],
    ['ember', '🔥'],
    ['react', '⚛️'],
    // strict, typescript configs already have default emojis.
  ],
  ruleDocSectionInclude: ['Examples'],
  urlConfigs:
    'https://github.com/square/eslint-plugin-square/blob/master/README.md#configurations',
};

module.exports = config;
