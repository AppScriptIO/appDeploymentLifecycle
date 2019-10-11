const ClassProducer = ({ Superclass = null } = {}) => {
  const self = class Class extends Superclass /* superclass must be function */ {
    constructor() {
      super()
    }
  }
  return self
}

export { ClassProducer }
