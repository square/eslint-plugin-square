'use strict';

/*
  Based on helper from eslint-plugin-ember:
  https://github.com/ember-cli/eslint-plugin-ember/blob/master/tests/helpers/faux-context.js
 */

const { parseForESLint } = require('../helpers/babel-eslint-parser');

/**
 * Builds a fake ESLint context object that's enough to satisfy the contract
 * expected by `getSourceModuleNameForIdentifier`
 */
class FauxContext {
  constructor(code, filename = '', report = () => {}) {
    const { ast } = parseForESLint(code);

    this.ast = ast;
    this.filename = filename;
    this.report = report;
  }

  /**
   * Does not build the full tree of "ancestors" for the identifier, but
   * we only care about the first one; the Program node
   */
  getAncestors() {
    return [this.ast];
  }

  getFilename() {
    return this.filename;
  }
}

module.exports = {
  FauxContext,
};
