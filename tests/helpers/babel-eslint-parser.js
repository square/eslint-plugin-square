const babelESLint = require('@babel/eslint-parser');

/**
 * @param {string} code
 * @returns {import('eslint').AST.Program}
 */
function parse(code) {
  return babelESLint.parse(code, {
    babelOptions: {
      configFile: require.resolve('../../.babelrc'),
    },
  });
}

/**
 * @param {string} code
 * @returns {import('eslint').SourceCode}
 */
function parseForESLint(code) {
  return babelESLint.parseForESLint(code, {
    babelOptions: {
      configFile: require.resolve('../../.babelrc'),
    },
  });
}

module.exports = {
  parse,
  parseForESLint,
};
