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