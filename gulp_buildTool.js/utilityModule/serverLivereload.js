const EventEmitter = require('events')
const childProcess = require('child_process')
// import proxyMiddleware from 'http-proxy-middleware'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ServerLivereload extends EventEmitter {
    
    constructor(gulp, debugArguments, entrypoint) {
        super()
        this.node;
        this.gulp = gulp
        this.debugArguments = debugArguments
        this.entrypoint = entrypoint
        // clean up if an error goes unhandled.
        process.on('exit', function() {
            if (this.node) this.node.kill()
        })

    }

    reload() {
        if (this.node) this.node.kill()

        // node = childProcess.fork('babelCompile.entrypoint.js', { cwd: '/app/serverSide', stdio:'inherit', execArgv: debugArguments})
        this.node = childProcess.fork(this.entrypoint.filename, { cwd: this.entrypoint.filePath, stdio:'inherit', execArgv: this.debugArguments})
        this.node.on('message', (m) => {
            // console.log('Server ready & listening.', m);
            this.emit('reload')
        });
        // node = childProcess.spawn('node', ['babelCompile.entrypoint.js'], { cwd: '/app/serverSide', stdio:[0,1,2] })
        this.node.on('close', (code) => {
            if(code === 8) {
                this.gulp.log('Error detected, waiting for changes.')
            }
        })
        // process.on('szn', (code) => {
        //     console.log('listening event emitted for child process 1!')
        // })    
        // node.on('szn', (code) => {
        //     console.log('listening event emitted for child process 1!')
        // })    
    }
}

module.exports = ServerLivereload;