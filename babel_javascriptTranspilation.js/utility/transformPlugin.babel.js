import * as babel from '@babel/core'

/**
* Babel transform plugin converts name modules beginning with @ to their relative path counterparts or a named module (non-relative path).
* transform example "@polymer/polymer/element.js" --> "/@webcomponent/@package/@polymer/polymer/element.js"
* transform example "lit-html/lib/lit-extended.js" --> "/@webcomponent/@package/lit-html/lib/lit-extended.js"
* https://astexplorer.net/
*/
export function transformNamedModuleToPath() {
    return {
        visitor: {
            "ImportDeclaration|ExportNamedDeclaration"(path) {
                let source = path.node.source
                if(!source) return
  
                let newSourceValue;
                if( 
                    source.value.startsWith('@') || 
                    !source.value.startsWith('/') && !source.value.startsWith('.')
                ) { // if not relative/absolute or starts with @ - basically could be sufficient to check for non relative&absolute path, but for clarity withh keep both conditions.
                    newSourceValue = `/@webcomponent/@package/${source.value}`
                    source.value = newSourceValue
                }
            }
        }
    }
  }

/**
 * Babel transform plugin that minifies template literals tagged with "html"
 */
export function minifyHtmlTemplateLiterals() { // doesn't work, >> ERROR { Error: AST root must be a Program or File node // i.e. partial ast isn't wrapped in an ast program.
    return {
        visitor: {
            "TaggedTemplateExpression"(path) {
              let tagName = path.node.tag.name
              if(!(tagName == 'html')) return;
              path.node.quasi.expressions
              let templateLiteral = path.node.quasi
              let expression = templateLiteral.expressions
              if(expression) {
                for(let index in expression) {
                    let code = babel.transformFromAst({
                        type: 'File',
                        program: {
                            type: 'Program',
                            sourceType: 'module',
                            body: [
                                expression[index]
                            ]
                        }
                    })
                    console.log(code)
                }
              }
            }
            
        }
    }
}
