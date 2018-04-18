import gulp from 'gulp'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const BrowserSync = require('browser-sync')
const ServerLivereload = require(path.join(config.UtilityModulePath, 'serverLivereload.js'))

// ⌚ Gulp watch settings 
// Fix high CPU usage for mounted filesystem in docker. And allow legacy file changes checking using flag 'usePolling' for chokidar.
// IMPORTANT: should maybe increase fs limit for number files that can be watched https://github.com/gulpjs/gulp/issues/217 https://discourse.roots.io/t/gulp-watch-error-on-ubuntu-14-04-solved/3453/6
const usePolling = false; // to allow Linux inotify to fire a file change event use - "docker-volume-watcher" on the Windows host (it is a python program that watches files on the host using native directory files change triggers, rather than polling).
const INTERVAL = (usePolling) ? 5000 : 0; // in polling set to 5000
// check maximum number of inotify watches - cat /proc/sys/fs/inotify/max_user_watches -  as per https://unix.stackexchange.com/questions/13751/kernel-inotify-watch-limit-reached
const watchOptions = {
    alwaysStat: true,
    interval: INTERVAL, // maybe the api of gulp watch changed so is the "interval" argument
    usePolling: usePolling
}

const browserSyncConfig = {
    host: 'localhost',
    port: 9903,
    proxy: {
        target: 'localhost',
        // ws: true // when localhost webapp uses websocket also.
    },
    ui: {
        port: 9901,
        weinre: {
            port: 9902
        }
    },
    // logLevel: 'debug',
    logConnections: true,
    open: false, // open browser false.
    scriptPath: () => 'http://HOST/browser-sync/browser-sync-client.js?v=2.18.8'.replace("HOST", 'localhost')
};

const entrypoint = {
    filename: process.env.SZN_OPTION_ENTRYPOINT_NAME || 'entrypoint.js',
    filePath: process.env.SZN_OPTION_ENTRYPOINT_PATH || '/project/application/source/serverSide/'
}

let debugArguments = (process.env.SZN_DEBUG == 'true') ? [process.env.SZN_DEBUG_COMMAND] : [];

let browserSync, serverLivereload;

// ⌚ Watch file changes for livereload.
// reload server & browser
gulp.task('livereload:ServerSide', ()=> {
	gulp.watch(
		[ // globs array - https://github.com/isaacs/node-glob
            '/project/application/source/serverSide/**/*.js', 
            // '/project/application/source/serverSide/**/*.css', 
            // '/project/application/source/serverSide/**/*.html', 
            // '/project/application/source/serverSide/node_modules/appscript{/**/*.js,!/node_modules/**/*}', 
            '!/project/application/source/serverSide/node_modules{,/**/*,!/appscript/**/*}',
            // '!/project/application/source/serverSide/node_modules/appscript/node_modules{,/**/*}', 
        ], // equals to '!/app/{node_modules,node_modules/**/*}'
		watchOptions, 
		async (done) => {
            if(usePolling) 
                setTimeout(function(){
                    console.info(`[nodejsLivereload] Reloading server...`)
                    serverLivereload.reload()
                    done()
                }, 1000);
            else {
                console.info(`[nodejsLivereload] Reloading server...`)
                serverLivereload.reload()
                done();
            }

        }
	);
});

// TODO: Watch files of clientSide-es5 when distribution is used.
// reload only browser
gulp.task('livereload:clientSide', ()=> {
	gulp.watch(
        // globs array - https://github.com/isaacs/node-glob
		[ // TODO: there is an issue when specifying multiple paths, for some reason it doesn't watch all files when separately configured, while watching all files without distinction is possible. Maybe an issue with glob strings
            
            // not working when separated.
            // '/project/application/source/clientSide/**/*.css', 
            // '/project/application/source/clientSide/**/*.html', 
            // '/project/application/source/clientSide/**/*.js', 

            // the following works.
            '/project/application/source/clientSide/**/*',  
            '!/project/application/source/clientSide/**/node_modules/**/*',
            '!/project/application/source/clientSide/**/component.package/**/*',
            '!/project/application/source/clientSide/**/js.package.yarn/**/*',
        ], // equals to '!/project/application/source/{node_modules,node_modules/**/*}'
		watchOptions, 
		async (done) => {
            if(usePolling)
                setTimeout(function(){
                    browserSync.reload()
                    done()
                }, 1000); // in polling was set to 1000
            else {
                browserSync.reload()
                done()
            }
        }        
	)
})

gulp.task('watch:livereload', 
	gulp.series(
		gulp.parallel(
            () => { // Initialize
                console.info(`☕ SZN Gulp - Running script "${entrypoint.filePath}${entrypoint.filename}". With arguments: ${debugArguments.join()}`)
                browserSync = BrowserSync.create('Info - locahost server')
                browserSync.init(browserSyncConfig)
                serverLivereload = new ServerLivereload(gulp, debugArguments, entrypoint)
                serverLivereload.on('reload', () => {
                    browserSync.reload()
                })
                serverLivereload.reload()
            },
            'livereload:ServerSide', 
            'livereload:clientSide'
        )
	)
);
