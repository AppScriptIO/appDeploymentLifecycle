const prefix = 'es5'

const GulpTaskDependency = [
    {
        name: `${prefix}:install:dependencies`,
        executionType: `parallel`,
        childTask: [
            {
                label: `${prefix}:jspm`
            },
            {
                label: `${prefix}:bower`
            },
        ]
    },
    {
        name: `${prefix}:copy:sourceToDistribution`,
        executionType: `parallel`,
        childTask: [
            {
                label: `${prefix}:clientSide`
            },
        ]
    },
    {
        name: `${prefix}:buildSourceCode`,
        executionType: `parallel`,
        childTask: [
            {
                label: `${prefix}:json`
            },
            {
                label: `${prefix}:html:metadata`
            },
            {
                label: `${prefix}:html:root`
            },
            {
                label: `${prefix}:html:webcomponent`
            },
            {
                label: `${prefix}:html:polymer`
            },
            // {
            //     label: `html:template`
            // },
            {
                label: `${prefix}:stylesheet:css`
            },
            {
                label: `${prefix}:javascript:js`
            },
        ]
    },
    {
        name: `${prefix}:symlink`,
        executionType: `parallel`,
        childTask: [
            {
                label: `${prefix}:nodeModules`
            },
        ]
    },
    {
        name: `${prefix}:build`,
        executionType: `series`,
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
            //     label: `symlink`
            // },
        ]
    },
]

module.exports = GulpTaskDependency