// Decorators - change descriptor on design time / while creating the class.

// Class decorator
function classDecorator(target) {
    
    target = new Proxy(target, {
        
    }) 
}

// Property decorator
function methodDecorator(target, propName, descriptor) {
    
}


// Parameter decorator
function paramDecorator(@func variable) {
    console.log(variable) // --> 'new value
}
function func(variable) {
    return 'new value'
}
// paramDecorator()

// Method decorator
function methodDecorator(target, propName, descriptor) {

}

function printMessage(t, p, d) {
    d.value = new Proxy(t[p], {
        apply: function (target, that, args) {
            console.log('OPA !!')
            return target.apply(that, args) 
        } 
    })
    return d
}

// Proxy 