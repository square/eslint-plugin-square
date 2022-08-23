// Couldn't find types for this package.
declare module '@babel/eslint-parser' {
  export function parse(
    code: string,
    options?: { babelOptions?: { configFile: string } }
  ): import('eslint').AST.Program;

  export function parseForESLint(
    code: string,
    options?: { babelOptions?: { configFile: string } }
  ): import('eslint').SourceCode;
}
