import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require('configuration/configuration.js') // configuration

const FileSource = [
    {
        key: 'jspm',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'jspm.js'),
            argument: [
				process.env.NODEJS_VERSION,
				source('/packageManager/browser.jspm')
			]
        }
    },
    {
        key: 'bower',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'bower.js'),
            argument: [
				source('/packageManager/browser.bower/')
			]
        }
    },

    {
        key: 'clientSide',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: [
				source(),
				'clientSide/',
				'/project/application/distribution/',
                'sourceToSame'
			]
        }
    },

    {
        key: 'json',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'json.js'),
            argument: [
                [
                    source('clientSide/**/*.json'),
                    '!' + source('clientSide/asset/webcomponent/component.package/**/*.json'),
                    '!' + source('clientSide/asset/javascript/js.package/**/*.json'),
                ],
                destination('clientSide/')
			]
        }
    },

    {
        key: 'html:metadata',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/metadata/**/*.html'),
                ],
                destination('clientSide/asset/metadata/'),
                'webcomponent'
			]
        }
    },
    {
        key: 'html:root',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/template/root/**/*.html'),
                ],
                destination('clientSide/template/root/'),
                'webcomponent'
			]
        }
    },
    { 
        key: 'html:webcomponent',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'html.js'),
            argument: [
                [
                    source('clientSide/asset/webcomponent/**/*.html'),  
                    '!'+ source('clientSide/asset/webcomponent/component.package/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/component.package/webcomponentsjs/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/component.package/web-component-tester/**/*.html'),
                    '!'+ source('clientSide/asset/webcomponent/component.package/polymer/**/*.html'),
                ],
                destination('clientSide/asset/webcomponent/'),
                'webcomponent'
			],
        }
    },
    // { // TODO: FIX uglify ES6.
    //     key: 'html:polymer',
    //     gulpTaskFunction: {
    //         path: path.join(config.TaskModulePath, 'html.js'),
    //         argument: [
    //             [
    //                 source('clientSide/asset/webcomponent/component.package/polymer/**/*.html'),  
    //             ],
    //             destination('clientSide/asset/webcomponent/component.package/polymer'),
    //             'polymer'
	// 		],
    //     }
    // },
    {
        key: 'stylesheet:css',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'stylesheet.js'),
            argument: [
				source(['clientSide/asset/stylesheet/**/*.css']),
				destination('clientSide/asset/stylesheet')
			]
        }
    },
    { // TODO: Minify ES6 & Transpile
        key: 'javascript:js',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'javascript.js'),
            argument: [
				[
					source('clientSide/asset/javascript/**/*.js'),
					source('packageManager/browser.jspm/**/*.js'),
					'!'+ source('clientSide/asset/javascript/js.package/**/*.js'),
					'!'+ source('**/node_modules/**/*.js'),
				],
				destination('clientSide/asset/javascript'),
                'pureJavascript'
			]
        }
    },
    // { // TODO: Minify ES6 & Transpile
    //     key: 'javascript:clientSide',
    //     gulpTaskFunction: {
    //         path: path.join(config.TaskModulePath, 'javascript.js'),
    //         argument: [
    //             [
    //                 source('clientSide/**/*.js'),
    //                 '!'+ source('clientSide/asset/webcomponent/component.package/**/*.js'),
    //                 '!'+ source('clientSide/asset/javascript/js.package/**/*.js')
    //             ],	
    //             destination('clientSide/'),
    //             config.GulpPath
	// 		]
    //     }
    // },

    {
        key: 'nodeModules',
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, 'symlinkNodeModules.js'),
            argument: [
				destination(config.GulpPath),
			]
        }
    },

    // { 
    //     key: '',
    //     gulpTaskFunction: {
    //         path: ,
    //         argument: [
	// 			[
	// 			],

	// 		]
    //     }
    // },
]

module.exports = FileSource