'use strict';

/**
 * @param {string} fileName
 * @returns {boolean}
 */
function isTestFile(fileName) {
  return /-test\.([jt]sx?|m[jt]s|c[jt]s)$/.test(fileName);
}

module.exports = isTestFile;
