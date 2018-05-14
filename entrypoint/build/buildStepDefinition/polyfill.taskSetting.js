import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require(`configuration/configuration.js`) // configuration
const prefix = config.distribution.clientSide.polyfill.prefix

export const taskAggregationSetting = [
    {
        name: `${prefix}:copy:sourceToDistribution`,
        executionType: `parallel`,
        childTask: [
            { label: `${prefix}:copyClientSide` },
        ]
    },
    {
        name: `${prefix}:buildSourceCode`,
        executionType: `parallel`,
        childTask: [
            { label: `${prefix}:json` },
            { label: `${prefix}:html:metadata` },
            { label: `${prefix}:html:root` },
            { label: `${prefix}:html:webcomponent` },
            { label: `${prefix}:html:polymer` },
            // { label: `html:template` },
            { label: `${prefix}:stylesheet:css` },
            { label: `${prefix}:javascript:js` },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: `series`,
        childTask: [
            { label: `${prefix}:copy:sourceToDistribution` },
            { label: `${prefix}:buildSourceCode` },
        ]
    },
]

export const taskSetting = [

    {
        key: `${prefix}:copyClientSide`,
        data: {
            path: path.join(config.TaskModulePath, `rsync.js`),
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
            path: path.join(config.TaskModulePath, `assetBuild/json.js`),
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
        key: `${prefix}:html:metadata`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/html.js`),
            module: 'htmlPolyfill',
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/asset/metadata/**/*.html'),
                ],
                destination: path.join(destination(prefix), 'asset/metadata/'),
            }
        }
    },
    {
        key: `${prefix}:html:root`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/html.js`),
            module: 'htmlPolyfill',
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/template/root/**/*.html'),
                ],
                destination: path.join(destination(prefix), 'template/root/'),
            }
        }
    },
    {
        key: `${prefix}:html:webcomponent`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/html.js`),
            module: 'htmlPolyfill',
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/asset/webcomponent/**/*.html'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/webcomponentsjs/**/*.html'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/web-component-tester/**/*.html'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/polymer/**/*.html'),
                ],
                destination: path.join(destination(prefix), 'asset/webcomponent'),
            },
        }
    },
    { 
        key: `${prefix}:html:polymer`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/html.js`),
            module: 'htmlPolyfill',
            argument: {
                sources: [
                    path.join(config.directory.clientSidePath, '/asset/webcomponent/@package/polymer/**/*.html'),
                ],
                destination: path.join(destination(prefix), 'asset/webcomponent/component.package/polymer'),
            },
        }
    },
    {
        key: `${prefix}:stylesheet:css`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/stylesheet.js`),
            argument: {
				sources: [
                    path.join(config.directory.clientSidePath, '/asset/stylesheet/**/*.css'),

                ],
                destination: path.join(destination(prefix), 'asset/stylesheet'),
            }
        }
    },
    { 
        key: `${prefix}:javascript:js`,
        data: {
            path: path.join(config.TaskModulePath, `assetBuild/javascript.js`),
            module: 'clientJS',
            argument: {
				sources: [
                    path.join(config.directory.clientSidePath, 'asset/javascript/**/*.js'),
                    path.join(config.directory.clientSidePath, 'asset/webcomponent/**/*.js'),
                    '!' + path.join(config.directory.clientSidePath, '**/@package/**/*.js'),
				],
                destination: path.join(destination(prefix), 'asset/javascript'),
                babelPath: config.directory.babelPath,
            }
        }
    },

]


