import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const prefix = `clientSide`

export const taskAggregationSetting = [
    {
        name: `${prefix}:install:dependencies`,
        executionType: 'parallel',
        childTask: [
            { label: 'jspm' },
            { label: 'webcomponent-yarn' },
            { label: 'library-yarn' },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: 'series',
        childTask: [
            { label: `${prefix}:install:dependencies` },
        ]
    },

]

export const taskSetting = [
    {
        key: 'jspm',
        data: {
            path: path.join(config.TaskModulePath, 'installPackage/jspm.js'),
            argument: {
                nodejsVersion: process.version,
                jspmLocation: source('/packageManager/library.browser.jspm')
            }
        }
    },
    {
        key: 'webcomponent-yarn',
        data: {
            path: path.join(config.TaskModulePath, 'installPackage/yarn.js'),
            argument: {
				yarnPath: source('/packageManager/webcomponent.browser.yarn/')
            }
        }
    },
    {
        key: 'library-yarn',
        data: {
            path: path.join(config.TaskModulePath, 'installPackage/yarn.js'),
            argument: {
				yarnPath: source('/packageManager/library.browser.yarn/')
            }
        }
    },

]