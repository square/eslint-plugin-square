'use strict';

/**
 * @param {string} fileName
 * @returns {boolean}
 */
function isTestFile(fileName) {
  return fileName.endsWith('-test.js') || fileName.endsWith('-test.ts');
}

module.exports = isTestFile;
