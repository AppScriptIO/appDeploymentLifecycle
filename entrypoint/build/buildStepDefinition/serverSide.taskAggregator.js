const prefix = 'serverSide'
const GulpTaskDependency = [
    {
        name: `${prefix}:install:dependencies`,
        executionType: 'series',
        childTask: [
            {
                label: 'npm'
            },
            // {
            //     label: 'npm:appscript'
            // }
        ]
    },
    {
        name: `${prefix}:copy:sourceToDistribution`,
        executionType: 'parallel',
        childTask: [
            {
                label: 'serverSide'
            },
        ]
    },
    {
        name: `${prefix}:buildSourceCode`,
        executionType: 'series',
        childTask: [
            {
                label: 'javascript:serverSide'
            },
            {
                label: 'javascript:appscript'
            }
        ]
    },
    {
        name: `${prefix}:symlink`,
        executionType: 'parallel',
        childTask: [
            {
                label: `${prefix}:nodeModules`
            },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: 'series',
        childTask: [
            {
                label: `${prefix}:install:dependencies`
            },
            {
                label: `${prefix}:copy:sourceToDistribution`
            },
            {
                label: `${prefix}:buildSourceCode`
            },
            // {
            //     label: 'symlink'
            // },
        ]
    },
]

module.exports = GulpTaskDependency