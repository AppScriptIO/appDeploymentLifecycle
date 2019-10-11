import assert from 'assert'
import { ClassProducer } from './dynamicClassExtention.js'
// const ModuleContext = require('appscript/module/ModuleContext')

describe.skip('Testing different implementation concepts', () => {
  describe('Creating static classes from function', () => {
    let staticClass1 = ClassProducer({ Superclass: null /* semilar to extending Function.prototype (if it was possible as it is an object) */ })
    let staticClass2 = ClassProducer({ Superclass: Object /* Object function */ })
    let staticClass3 = ClassProducer({ Superclass: Function /* Object prototype */ })

    it('should create a class that extends from Function.prototype, Object.prototype, & null', () => {
      assert.strictEqual(staticClass1.__proto__, Function.prototype)
      assert.strictEqual(staticClass1.__proto__.__proto__, Object.prototype)
      assert.strictEqual(staticClass1.__proto__.__proto__.__proto__, null)
    })
    it('should create a class that extends from Object function, Function.prototype, Object.prototype, & null', () => {
      assert.strictEqual(staticClass2.__proto__, Object)
      assert.strictEqual(staticClass2.__proto__.__proto__, Function.prototype)
      assert.strictEqual(staticClass2.__proto__.__proto__.__proto__, Object.prototype)
      assert.strictEqual(staticClass2.__proto__.__proto__.__proto__.__proto__, null)
    })
    it('should create a class that extends from Function, Function.prototype, Object.prototype, & null', () => {
      assert.strictEqual(staticClass3.__proto__, Function)
      assert.strictEqual(staticClass3.__proto__.__proto__, Function.prototype)
      assert.strictEqual(staticClass3.__proto__.__proto__.__proto__, Object.prototype)
      assert.strictEqual(staticClass3.__proto__.__proto__.__proto__.__proto__, null)
    })
  })

  describe('check how proxy with class works', () => {
    class Class {
      constructor() {
        console.log('CALLED - Class constructor')
      }
    }
    let C = new Proxy(Class, {
      construct: function(target, argumentsList, newTarget) {
        console.log('CALLED - Proxy Class constructor')
        return Reflect.construct(target, argumentsList)
      },
      apply: function(target, thisArg, argumentsList) {
        console.log('proxy called - apply')
        // return new target(argumentsList)
      },
    })

    it('static class can a proxy', () => {
      console.log(new C())
    })
  })

  describe('Is proxy on superclass constructor called through subclass is instantiated ?', () => {
    class Superclass {
      constructor() {
        console.log('CALLED - Superclass constructor')
      }
    }
    let S = new Proxy(Superclass, {
      construct: function(target, argumentsList, newTarget) {
        console.log('CALLED - Proxy Superclass constructor')
        let instance = Reflect.construct(target, argumentsList)
        return instance
      },
      // apply: function(target, thisArg, argumentsList) {
      //     console.log('proxy called - apply')
      //     // return new target(argumentsList)
      // }
    })
    class Class extends S {
      constructor() {
        console.log('CALLED - Class constructor')
        super()
      }
    }
    it('static class can extend a proxy superclass', () => {
      console.log(new Class())
      // console.log(new S())
    })
  })

  describe('Wrapping "new" calls with a specific Prototype context to share common state', () => {
    class Superclass {
      constructor() {}
    }
    class Class extends Superclass {
      constructor() {
        super()
      }
    }
    Class.prototype.x = 'hello'
    let regularInstance = new Class()

    it('should create regular prototype chain (Basic language behavior)', () => {
      assert.strictEqual(regularInstance.__proto__, Class.prototype)
      assert.strictEqual(regularInstance.__proto__.__proto__, Superclass.prototype)
    })

    function createPrototypeChainObject(currectPrototype, superPrototype = Object) {
      let pointerPrototype = Object.create(superPrototype)
      return new Proxy(pointerPrototype, {
        get: function(target, property, receiver) {
          Object.defineProperty(pointerPrototype, 'delegatedPrototype', {
            value: currectPrototype,
            writable: true,
            enumerable: true,
            configurable: true,
          })
          if (property == 'delegatedPrototype') return currectPrototype
          if (currectPrototype.hasOwnProperty(property)) {
            return Reflect.get(currectPrototype, property)
          } else if (Object.getPrototypeOf(target)) {
            return Reflect.get(Object.getPrototypeOf(target), property)
          } else {
            return undefined
          }
        },
        // getPrototypeOf(target) {
        //     console.log(target)
        //     return Object.getPrototypeOf(target)
        // }
      })
    }
    // Manual prototype switching
    let superclass = new Superclass()
    superclass.sharedState = 'Shared'
    let sharedStateInstance1 = new Class()
    let superclassProto = createPrototypeChainObject(superclass)
    let classProto = createPrototypeChainObject(Class.prototype, superclassProto)
    Object.setPrototypeOf(sharedStateInstance1, classProto)
    let superclassProto2 = createPrototypeChainObject(superclass)
    let classProto2 = createPrototypeChainObject(Class.prototype, superclassProto2)
    let sharedStateInstance2 = new Class()
    Object.setPrototypeOf(sharedStateInstance2, classProto2)

    it('should create shared prototype chain', () => {
      assert.strictEqual(sharedStateInstance1.x, Class.prototype.x)
      assert.strictEqual(sharedStateInstance1.sharedState, superclass.sharedState)
      assert.strictEqual(sharedStateInstance1.sharedState, sharedStateInstance2.sharedState)
      // assert.strictEqual(sharedStateInstance1.__proto__.__proto__.__proto__, Superclass.prototype)
      assert.strictEqual(Object.getPrototypeOf(sharedStateInstance1).delegatedPrototype, Object.getPrototypeOf(sharedStateInstance2).delegatedPrototype)
    })

    function createPrototypeChainObjectOnConstructor(Class, Superclass) {
      return new Proxy(Class, {
        construct: function(newObj, argumentsList, constructorFunc) {
          let oldProto = Class.prototype
          let newProto
          if (
            Object.getPrototypeOf(Class.prototype) !== Object ||
            Object.getPrototypeOf(Class.prototype) !== Function ||
            Object.getPrototypeOf(Class.prototype) !== Object.prototype ||
            Object.getPrototypeOf(Class.prototype) !== Function.prototype ||
            Object.getPrototypeOf(Class.prototype) !== null
          ) {
            newProto = createPrototypeChainObject(oldProto, Superclass || Object.getPrototypeOf(Class.prototype))
          } else {
            newProto = createPrototypeChainObject(oldProto)
          }
          Object.setPrototypeOf(newObj, newProto)
          return newObj
        },
        // getPrototypeOf(target) {

        // }
      })
    }

    class S {}
    S.prototype.x = 'x'
    let Sp = createPrototypeChainObjectOnConstructor(S)
    class C extends Sp {}
    let Cp = createPrototypeChainObjectOnConstructor(C, Sp)
    // new S => {}.proto = {} - sp - Sp

    let instancex = new Sp()
    let instancey = new Cp()
    // console.log(Object.getPrototypeOf(instancey).delegatedPrototype)
    // console.log(Object.getPrototypeOf(Object.getPrototypeOf(instancey)).delegatedPrototype)
    // console.log(Object.getPrototypeOf(instancey))
    // console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(instancey))))
  })
})

// setTimeout(() => {

// }, 10000000000);
