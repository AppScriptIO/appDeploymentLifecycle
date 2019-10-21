const inspector = require('inspector')
inspector.open(...[, ,], true) // https://nodejs.org/api/inspector.html#inspector_inspector_open_port_host_wait

console.log('• before debugger')
debugger
console.log('• after debugger')
