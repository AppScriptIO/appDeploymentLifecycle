import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const prefix = config.distribution.clientSide.polyfill.prefix

export const taskAggregationSetting = [
    {
        name: `${prefix}:buildSourceCode`,
        executionType: 'parallel',
        childTask: [
            { label: `${prefix}:json` },
            { label: `${prefix}:html` },
            { label: `${prefix}:stylesheet` },
            { label: `${prefix}:javascript` },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: 'series',
        childTask: [
            { label: `${prefix}:copy:sourceCode` },
            { label: `${prefix}:buildSourceCode` },
        ]
    },
]

export const taskSetting = [

    {
        key: `${prefix}:copy:sourceCode`,
        data: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: {
                source: config.directory.clientSidePath,
                destination: destination(prefix),
                algorithm: 'sourceToSame',
                copyContentOnly: true
            }
        }
    },

    {
        key: `${prefix}:json`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/json.js'),
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/**/*.json'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/**/*.json'),
                ],
                destination: destination(prefix)
            }
        }
    },

    {
        key: `${prefix}:html`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/html.js'),
            module: 'html',
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/**/*.html'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/**/*.html'),
                ],
                destination: destination(prefix),
                babelPath: config.directory.babelPath, 
                babelConfigFileName: 'polyfillClientSideBuild.BabelConfig.js'
            },
        }
    },
    {
        key: `${prefix}:stylesheet`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/stylesheet.js'),
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/**/*.css'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/**/*.css'),
                ],
                destination: destination(prefix),
            }
        }
    },
    {
        key: `${prefix}:javascript`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/javascript.js'),
            module: 'clientJS',
            argument: {
				sources: [
                    path.join(config.directory.clientSidePath, '/**/*.js'), // including package js to allow named import path transformation.
                    '!' + path.join(config.directory.clientSidePath, '/**/@package/**/*.js'),
                    path.join(config.directory.clientSidePath, '/**/webcomponent/@package/@polymer/**/*.js'),
                    '!' + path.join(config.directory.clientSidePath, '/**/webcomponent/@package/@polymer/**/bower_components/**/*.js'), // polymer 3 contains a bower_components folder.
                ],
                destination: destination(prefix),
                babelPath: config.directory.babelPath,
                babelConfigFileName: 'polyfillClientSideBuild.BabelConfig.js',
                includeSourceMap: false
            }
        }
    },

]