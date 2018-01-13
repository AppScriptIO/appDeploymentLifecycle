import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require(`configuration/configuration.js`) // configuration
const prefix = `es5`

const FileSource = [
    {
        key: `${prefix}:jspm`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `jspm.js`),
            argument: [
				process.env.NODEJS_VERSION,
				source(`/packageManager/browser.jspm`)
			]
        }
    },
    {
        key: `${prefix}:bower`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `bower.js`),
            argument: [
				source(`/packageManager/browser.bower/`)
			]
        }
    },

    {
        key: `${prefix}:clientSide`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `rsync.js`),
            argument: [
				source(),
				`clientSide-${prefix}/`,
				`/project/application/distribution/`
			]
        }
    },

    {
        key: `${prefix}:json`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `json.js`),
            argument: [
                [
                    source(`clientSide/**/*.json`),
                    `!` + source(`clientSide/asset/webcomponent/component.package/**/*.json`),
                    `!` + source(`clientSide/asset/javascript/js.package/**/*.json`),
                ],
                destination(`clientSide-${prefix}/`)
			]
        }
    },

    {
        key: `${prefix}:html:metadata`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `html.js`),
            argument: [
                [
                    source(`clientSide/asset/metadata/**/*.html`),
                ],
                destination(`clientSide-${prefix}/asset/metadata/`),
                `webcomponentES5`
			]
        }
    },
    {
        key: `${prefix}:html:root`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `html.js`),
            argument: [
                [
                    source(`clientSide/template/root/**/*.html`),
                ],
                destination(`clientSide-${prefix}/template/root/`),
                `webcomponentES5`
			]
        }
    },
    { // TODO: FIX uglify ES6.
        key: `${prefix}:html:webcomponent`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `html.js`),
            argument: [
                [
                    source(`clientSide/asset/webcomponent/**/*.html`),  
                    // `!`+ source(`clientSide/asset/webcomponent/component.package/**/*.html`),
                    `!`+ source(`clientSide/asset/webcomponent/component.package/webcomponentsjs/**/*.html`),
                    `!`+ source(`clientSide/asset/webcomponent/component.package/web-component-tester/**/*.html`),
                    `!`+ source(`clientSide/asset/webcomponent/component.package/polymer/**/*.html`),
                ],
                destination(`clientSide-${prefix}/asset/webcomponent/`),
                `webcomponentES5`
			],
        }
    },
    { // TODO: FIX uglify ES6.
        key: `${prefix}:html:polymer`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `html.js`),
            argument: [
                [
                    source(`clientSide/asset/webcomponent/component.package/polymer/**/*.html`),  
                ],
                destination(`clientSide-${prefix}/asset/webcomponent/component.package/polymer`),
                `polymer`
			],
        }
    },
    {
        key: `${prefix}:stylesheet:css`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `stylesheet.js`),
            argument: [
				source([`clientSide/asset/stylesheet/**/*.css`]),
				destination(`clientSide-${prefix}/asset/stylesheet`)
			]
        }
    },
    { // TODO: Minify ES6 & Transpile
        key: `${prefix}:javascript:js`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `javascript.js`),
            argument: [
				[
					source(`clientSide/asset/javascript/**/*.js`),
					source(`clientSide/asset/webcomponent/**/*.js`),
					'!'+ source(`clientSide/asset/webcomponent/component.package/**/*.js`),
					source('packageManager/browser.jspm/**/*.js'), // TODO: fix non  existant folder path.
                    `!`+ source(`clientSide/asset/javascript/js.package/**/*.js`),
                    '!'+ source('**/node_modules/**/*.js'),                    
				],
				destination(`clientSide-${prefix}/asset/javascript`),
                `pureJavascript`
			]
        }
    },
    // { // TODO: Minify ES6 & Transpile
    //     key: `javascript:clientSide`,
    //     gulpTaskFunction: {
    //         path: path.join(config.TaskModulePath, `javascript.js`),
    //         argument: [
    //             [
    //                 source(`clientSide/**/*.js`),
    //                 `!`+ source(`clientSide/asset/webcomponent/component.package/**/*.js`),
    //                 `!`+ source(`clientSide/asset/javascript/js.package/**/*.js`)
    //             ],	
    //             destination(`clientSide/`),
    //             config.GulpPath
	// 		]
    //     }
    // },

    {
        key: `${prefix}:nodeModules`,
        gulpTaskFunction: {
            path: path.join(config.TaskModulePath, `symlinkNodeModules.js`),
            argument: [
				destination(config.GulpPath),
			]
        }
    },

    // { 
    //     key: ``,
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