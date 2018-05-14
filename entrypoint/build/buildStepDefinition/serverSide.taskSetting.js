import { include, joinPath, source, destination, plugins } from 'gulpfile.js'
import path from 'path'
const config = require('configuration/configuration.js') // configuration
const prefix = 'serverSide'

export const taskAggregationSetting = [
    {
        name: `${prefix}:install:dependencies`,
        executionType: 'series',
        childTask: [
            { label: `${prefix}:install:yarn` },
        ]
    },
    {
        name: `${prefix}:copy:sourceToDistribution`,
        executionType: 'parallel',
        childTask: [
            { label: `${prefix}:copy:serverSide` },
            { label: `${prefix}:copy:databaseData` }
        ]
    },
    {
        name: `${prefix}:transpile:buildJavascriptCode`,
        executionType: 'series',
        childTask: [
            { label: `${prefix}:transpile:serverSide` },
            { label: `${prefix}:transpile:appscript` },
            { label: `${prefix}:transpile:databaseData` },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: 'series',
        childTask: [
            { label: `${prefix}:install:dependencies` },
            { label: `${prefix}:copy:sourceToDistribution` },
            { label: `${prefix}:transpile:buildJavascriptCode` },
        ]
    },
]

export const taskSetting = [
    {
        key: `${prefix}:install:yarn`,
        data: {
            path: path.join(config.TaskModulePath, 'installPackage/yarn.js'),
            argument: {
				yarnPath: source('/packageManager/library.server.yarn/')
            }
        }
    },
    {
        key: `${prefix}:copy:serverSide`,
        data: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: {
                source: config.directory.serverSidePath,
                destination: destination(prefix),
                algorithm: 'sourceToSame',
                copyContentOnly: true
            }
        }
    },
    {
        key: `${prefix}:copy:databaseData`,
        data: {
            path: path.join(config.TaskModulePath, 'rsync.js'),
            argument: {
                source: source('databaseData'),
                destination: destination(),
                algorithm: 'sourceToSame',
                copyContentOnly: false
            }
        }
    },
    {
        key: `${prefix}:transpile:databaseData`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/javascript.js'),
            module: 'serverJS',
            argument: {
                sources: [
                    source('databaseData/**/*.js'),
                    '!'+ source('databaseData/node_modules/**/*.js'),
                ],	
                destination: destination('databaseData/'),
                babelPath: config.directory.babelPath,
            }
        }
    },
    {
        key: `${prefix}:transpile:serverSide`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/javascript.js'),
            module: 'serverJS',
            argument: {
                sources: [
                    path.join(config.directory.serverSidePath, '**/*.js'),
                    '!'+ source('serverSide/node_modules/**/*.js'),
                ],	
                destination: destination('serverSide/'),
                babelPath: config.directory.babelPath,
            }
        }
    },
    {
        key: `${prefix}:transpile:appscript`,
        data: {
            path: path.join(config.TaskModulePath, 'assetBuild/javascript.js'),
            module: 'serverJS',
            argument: {
                sources: [
                    path.join(config.directory.serverSidePath, 'node_modules/appscript/**/*.js'),
                    '!'+ path.join(config.directory.serverSidePath, 'node_modules/appscript/node_modules/**/*.js'),
                ],	
                destination: destination('serverSide/node_modules/appscript'),
                babelPath: config.directory.babelPath,
            }
        }
    },
]
