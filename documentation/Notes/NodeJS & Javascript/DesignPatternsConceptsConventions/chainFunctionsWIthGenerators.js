/**
 * Comment for related pattern `switch function` - a function that calls or propagates control to other functions depending on implemenatation key passed to it. 
 * In the switch pattern the usage of `yield*` won't be possible - `yield*` does not allow for passing arguments to the implicit `next` it calls. i.e. `yield*` will call next on the iterable without arguments, if the iterable was already initialized or uses `function.sent` proposal, the `next` call from `yield*` will not pass arguments, and cannot be controlled.
 */

function* G() {
  let handControl = Boolean(function.sent)
  const step = [
    {
      func: function(previousArg, arg) {

      },
      passThroughArg: {}, 
      condition: () => (true) ? true : false
    }
  ]

  let i = 0, result
  while(i < step.length) {  
    if(step[i].condition && step[i].condition()) {
      i++; continue
    }
    if(handControl) {
      yield step[i].passThroughArg
      result = step[i].func(result, function.sent)
    } else {
      result = step[i].func(result, step[i].passThroughArg)
    }
    i++
  }

}

let g = G()
let arg1 = g.next('intermittent' || true).value
let arg2 = g.next(arg1).value
let result = g.next(arg2).value