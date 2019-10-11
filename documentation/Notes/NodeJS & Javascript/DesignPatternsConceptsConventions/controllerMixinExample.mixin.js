import { Mixin } from 'mixwith'

/**
 * @description Extends a class by super class and adds some common functionality.
 */
export default Mixin(({Superclass}) => {
    const self = class GraphControllerMixin /** Name specifically mentioned for easier debugging */ extends Superclass {
        constructor(...args) {
            // mixins should either 1) not define a constructor, 2) require a specific
            // constructor signature, or 3) pass along all arguments.
            super(...args);
        }
    }
    return self
})