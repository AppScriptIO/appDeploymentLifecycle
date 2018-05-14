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
  