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
    'eslint-plugin/prefer-object-rule': 'error',
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
    {
      // Markdown code samples in documentation:
      files: ['**/*.md'],
      plugins: ['markdown'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'filenames/match-regex': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'node/no-missing-import': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        'unicorn/filename-case': 'off',
      },
    },
  ],
};
