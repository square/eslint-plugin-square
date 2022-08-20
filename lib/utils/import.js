'use strict';

/*
  Based on util from eslint-plugin-ember:
  https://github.com/ember-cli/eslint-plugin-ember/blob/master/lib/utils/import.js
 */

const assert = require('node:assert');

module.exports = {
  getSourceModuleNameForIdentifier,
  getSourceModuleName,
  getImportIdentifier,
};

/**
 * Gets the name of the module that an identifier was imported from,
 * if it was imported
 *
 * @param {import('eslint').Rule.RuleContext | import('../../tests/helpers/faux-context').FauxContext} context the context of the ESLint rule
 * @param {import('estree').Node} node the node to find an import for
 * @returns {string | undefined} The name of the module the identifier was imported from, if it was imported
 */
function getSourceModuleNameForIdentifier(context, node) {
  const sourceModuleName = getSourceModuleName(node);
  const [program] = context.getAncestors();
  if (program.type !== 'Program') {
    return undefined;
  }
  const importDeclaration = program.body.find(
    (importDeclaration) =>
      importDeclaration.type === 'ImportDeclaration' &&
      importDeclaration.specifiers.some(
        (specifier) => specifier.local.name === sourceModuleName
      )
  );

  return importDeclaration &&
    importDeclaration.type === 'ImportDeclaration' &&
    importDeclaration.source.type === 'Literal' &&
    typeof importDeclaration.source.value === 'string'
    ? importDeclaration.source.value
    : undefined;
}

/**
 * @param {import('estree').Node|undefined} node
 * @returns {string|undefined}
 */
function getSourceModuleName(node) {
  if (node?.type === 'CallExpression' && node.callee) {
    return getSourceModuleName(node.callee);
  } else if (node?.type === 'MemberExpression' && node.object) {
    return getSourceModuleName(node.object);
  } else if (node?.type === 'Identifier') {
    return node.name;
  } else {
    assert(
      false,
      '`getSourceModuleName` should only be called on a `CallExpression`, `MemberExpression` or `Identifier`'
    );
    return undefined;
  }
}

/**
 * Gets an import identifier (either imported or local name) from the specified ImportDeclaration.
 *
 * @param {import('estree').Node} node the ImportDeclaration to find the import identifier for
 * @param {string} source the source, or module name string, of the import
 * @param {string=} [namedImportIdentifier=null] the named import identifier to find (will return the alias of the import, of found)
 * @returns {string|undefined} if no import is found with that name
 */
function getImportIdentifier(node, source, namedImportIdentifier = undefined) {
  assert(
    node && node.type === 'ImportDeclaration',
    `getImportIdentifier should be called with a node that's type is 'ImportDeclaration'. You passed '${node.type}'`
  );

  if (node.source.value !== source) {
    return undefined;
  }

  return node.specifiers
    .filter((specifier) => {
      return (
        (specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === namedImportIdentifier) ||
        (!namedImportIdentifier && specifier.type === 'ImportDefaultSpecifier')
      );
    })
    .map((specifier) => specifier.local.name)
    .pop();
}
