'use strict'; // Strict enforces specific conditions and imported scripts may have problems.

let filesystem = require('fs');
let include = (file)=> { eval(filesystem.readFileSync(file) + '') }; // Execute file code as if written locally.
include('./server/proxy.js');
