module.exports = {
  extends: [
    './lib/config/base.js',
    'plugin:eslint-plugin/all',
    'plugin:node/recommended',
  ],
  plugins: ['eslint-plugin'],
  env: {
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'script',
  },
  rules: {
    'eslint-plugin/consistent-output': ['error', 'always'],
    'eslint-plugin/meta-property-ordering': 'off',
    'eslint-plugin/require-meta-docs-url': [
      'error',
      {
        pattern:
          'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/{{name}}.md',
      },
    ],
    'eslint-plugin/test-case-property-ordering': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
