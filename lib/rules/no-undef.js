'use strict';

/**
 * SQUARE FORK
 *
 * This file was copied from the official eslint repo [1] in order to add
 * fixing undefined variables by adding imports in some situations. You can disable
 * the original rule and enable this one as desired.
 *
 * Due to the nature of the changes made to this file, updating it from upstream
 * must be done by hand, comparing the original version from below with the
 * latest version from the official repo and applying those changes here.
 *
 * [1]: https://github.com/eslint/eslint/blob/6e9ff08cf8ac9188331fcea7905ce162accefe81/lib/rules/no-undef.js
 */

/**
 * @fileoverview Rule to flag references to undeclared variables.
 * @author Mark Macdonald
 */
'use strict';

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if the given node is the argument of a typeof operator.
 * @param {ASTNode} node The AST node being checked.
 * @returns {boolean} Whether or not the node is the argument of a typeof operator.
 */
function hasTypeOfOperator(node) {
  const parent = node.parent;

  return parent.type === 'UnaryExpression' && parent.operator === 'typeof';
}

/* <SQUARE> */

/**
 * Manages adding imported bindings to a module by creating or modifying
 * import declarations.
 */
class ImportedBindingCreator {
  /**
   * @param {SourceCode} sourceCode
   * @param {ASTNode} program
   */
  constructor(sourceCode, program) {
    this.sourceCode = sourceCode;
    this.program = program;
  }

  /**
   * Creates a binding by adding or modifying imports.
   *
   * @param {Fixer} fixer a fixer provided by eslint
   * @param {string} localBinding the local name of the binding
   * @param {string} exportedBinding the name exported by the imported module
   * @param {string} source the path to the imported module
   * @returns {Fix}
   */
  createBinding(fixer, localBinding, exportedBinding, source) {
    if (exportedBinding === 'default') {
      return this.createDefaultImportBinding(fixer, localBinding, source);
    } else {
      return this.createNamedImportBinding(
        fixer,
        localBinding,
        exportedBinding,
        source
      );
    }
  }

  /**
   * Creates a default import binding by adding or modifying imports.
   *
   * @param {Fixer} fixer a fixer provided by eslint
   * @param {string} localBinding the local name of the binding
   * @param {string} source the path to the imported module
   * @returns {Fix}
   */
  createDefaultImportBinding(fixer, localBinding, source) {
    const existingImportDeclaration = this.findExistingImportDeclarationWithSource(
      source
    );

    if (existingImportDeclaration) {
      for (let i = 0; i < existingImportDeclaration.specifiers.length; i++) {
        const specifier = existingImportDeclaration.specifiers[i];

        if (specifier.type === 'ImportDefaultSpecifier') {
          // There's already a default import binding from the module we want,
          // so we'll add a duplicate named import binding.
          return this.createNamedImportBinding(localBinding, 'default', source);
        }
      }

      // There's no default import yet, so we add it right before the initial
      // named import specifier.
      const initialSpecifier = existingImportDeclaration.specifiers[0];
      const leftCurlyToken = this.sourceCode.getTokenBefore(initialSpecifier);

      // import { helper } from 'foo'; → import foo, { helper } from 'foo';
      return fixer.insertTextBefore(leftCurlyToken, `${localBinding}, `);
    } else {
      const lastImportAtTop = this.findLastImportAtTop();

      if (lastImportAtTop) {
        return fixer.insertTextAfter(
          lastImportAtTop,
          `\nimport ${localBinding} from '${source}';`
        );
      } else {
        return fixer.insertTextBefore(
          this.program.body[0],
          `import ${localBinding} from '${source}';\n`
        );
      }
    }
  }

  /**
   * Creates a named import binding by adding or modifying imports.
   *
   * @param {Fixer} fixer a fixer provided by eslint
   * @param {string} localBinding the local name of the binding
   * @param {string} exportedBinding the name exported by the imported module
   * @param {string} source the path to the imported module
   * @returns {Fix}
   */
  createNamedImportBinding(fixer, localBinding, exportedBinding, source) {
    const existingImportDeclaration = this.findExistingImportDeclarationWithSource(
      source
    );
    const newSpecifier =
      exportedBinding === localBinding
        ? localBinding
        : `${exportedBinding} as ${localBinding}`;

    if (existingImportDeclaration) {
      const lastImportSpecifier =
        existingImportDeclaration.specifiers[
          existingImportDeclaration.specifiers.length - 1
        ];

      // We can handle named specifiers and default specifiers, but anything
      // else is incompatible with named exports. If that's what we're seeing,
      // we fall out of this case and just add a new import declaration.
      if (lastImportSpecifier.type === 'ImportSpecifier') {
        return fixer.insertTextAfter(lastImportSpecifier, `, ${newSpecifier}`);
      } else if (lastImportSpecifier.type === 'ImportDefaultSpecifier') {
        return fixer.insertTextAfter(
          lastImportSpecifier,
          `, { ${newSpecifier} }`
        );
      }
    }

    const lastImportAtTop = this.findLastImportAtTop();

    if (lastImportAtTop) {
      return fixer.insertTextAfter(
        lastImportAtTop,
        `\nimport { ${newSpecifier} } from '${source}';`
      );
    } else {
      return fixer.insertTextBefore(
        this.program.body[0],
        `import { ${localBinding} } from '${source}';\n`
      );
    }
  }

  /**
   * Finds the first import with the specified module source.
   *
   * @param {string} source the path to the imported module
   * @returns {?ASTNode}
   */
  findExistingImportDeclarationWithSource(source) {
    for (let i = 0; i < this.program.body.length; i++) {
      const statement = this.program.body[i];

      if (statement.type === 'ImportDeclaration') {
        if (statement.source.value === source) {
          return statement;
        }
      }
    }

    return null;
  }

  /**
   * Finds the last import declaration at the top of the module.
   *
   * @returns {?ASTNode}
   */
  findLastImportAtTop() {
    let result = null;

    for (let i = 0; i < this.program.body.length; i++) {
      const statement = this.program.body[i];

      if (statement.type === 'ImportDeclaration') {
        result = statement;
      }
    }

    return result;
  }
}

/**
 * Based on the imports provided in the configuration for this rule, determines
 * the path to import for a global name if available.
 *
 * @param {Array<{ global: string, path: string, named?: boolean }>} imports
 * @param {string} name
 * @returns {?{ global: string, path: string, named?: boolean }}
 */
function getImportInfoForGlobal(imports, name) {
  return imports.find((info) => info.global === name);
}

/* </SQUARE> */

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'disallow the use of undeclared variables unless mentioned in `/*global */` comments',
      category: 'Variables',
      recommended: true,
      url:
        'https://github.com/square/eslint-plugin-square/tree/master/docs/rules/no-undef.md',
    },

    fixable: 'code',

    schema: [
      {
        type: 'object',
        properties: {
          typeof: {
            type: 'boolean',
          },
          /* <SQUARE> */
          imports: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                global: {
                  type: 'string',
                },
                path: {
                  type: 'string',
                },
                named: {
                  type: 'boolean',
                },
              },
            },
          },
          /* </SQUARE> */
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0];
    const considerTypeOf = (options && options.typeof === true) || false;

    /* <SQUARE> */
    const alreadyFixed = new Set();
    const imports = (options && options.imports) || [];
    /* </SQUARE> */

    return {
      'Program:exit'(node) {
        const globalScope = context.getScope();

        globalScope.through.forEach(function (reference) {
          const identifier = reference.identifier;

          if (!considerTypeOf && hasTypeOfOperator(identifier)) {
            return;
          }

          /* <SQUARE> */
          const info = getImportInfoForGlobal(imports, identifier.name);
          let fix;

          if (info && info.path && !alreadyFixed.has(identifier.name)) {
            alreadyFixed.add(identifier.name);
            fix = function (fixer) {
              return new ImportedBindingCreator(
                context.getSourceCode(),
                node
              ).createBinding(
                fixer,
                identifier.name,
                info.named ? identifier.name : 'default',
                info.path
              );
            };
          }
          /* </SQUARE> */

          context.report({
            node: identifier,
            message: "'{{name}}' is not defined.",
            data: identifier,
            /* <SQUARE> */
            fix,
            /* </SQUARE> */
          });
        });
      },
    };
  },
};
