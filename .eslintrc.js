module.exports = {
  extends: [
    'plugin:eslint-plugin/all',
    'plugin:node/recommended',
    'plugin:square/base',
  ],
  plugins: ['eslint-plugin'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'script',
  },
  rules: {
    'eslint-plugin/require-meta-docs-url': [
      'error',
      {
        pattern:
          'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/{{name}}.md',
      },
    ],
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown',
    },
    {
      // Markdown code samples in documentation:
      files: ['**/*.md/*.js'],
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
