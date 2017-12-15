let data = [
    /**
     * Linux update and install
     */
    {
        key: 'c639cd53-c764-4967-b052-1e1652107923',
        label: {
            name: 'linux upgrade'
        },
        command: 'apt-get',
        argument: ['upgrade -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'
    },
    {
        key: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
        label: {
            name: 'linux update'
        },
        command: 'apt-get',
        argument: ['update -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: 'e971b884-1b33-4044-9c93-162ee145b807',
        label: {
            name: 'linux update fix-missing'
        },
        command: 'apt-get',
        argument: ['update -y --fix-missing'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },

    /** 
     * Installation of packages
     */ 
    {
        key: '5bd9f5e6-f53f-48eb-8411-7bbe442b40c8',
        label: {
            name: 'install apt-utils'
        },
        command: 'apt-get',
        argument: ['install apt-utils -y'], // use --no-install-recommends (Doesn't WORK) to prevent errors
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '4d97a40d-d891-46ef-8c30-b7c6b2b273dd',
        label: {
            name: 'Install wget'
        },
        command: 'apt-get',
        argument: ['install wget -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '4214796e-97cc-46d6-84a4-e7004fe1e90f',
        label: {
            name: 'Install curl'
        },
        command: 'apt-get',
        argument: ['install curl -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: 'abffa7d2-100f-4283-b03c-42f9c4a806a7',
        label: {
            name: 'Install nano'
        },
        command: 'apt-get',
        argument: ['install nano -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '837f4b32-8884-4112-8760-77ad69a7af42',
        label: {
            name: 'Install vim'
        },
        command: 'apt-get',
        argument: ['install vim -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: '9945d6d5-1f51-4ee0-8183-bbbb19b6ca80',
        label: {
            name: 'Install zip & unzip'
        },
        command: 'apt-get',
        argument: ['install zip unzip -y'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },

    {
        key: 'aef9a3c7-b9a8-4485-8786-41f7daeaacfb',
        label: {
            name: 'Install git'
        },
        filename: 'git.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '7da4e483-2c3b-49c6-9b99-baa6bc7d0ab6',
        label: {
            name: 'Install yarn'
        },
        filename: 'yarn.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '0bf7e089-8eeb-430e-aa08-e15f44ab8208',
        label: {
            name: 'Install bower'
        },
        filename: 'bower.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: 'a121a83e-7022-4021-8b25-04669964a126',
        label: {
            name: 'Install gulp'
        },
        filename: 'gulp.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '82764a24-022c-4d8b-9fd5-e40d68e0bce0',
        label: {
            name: 'Install rsync'
        },
        filename: 'rsync.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '87319ca8-c3e5-4d41-bd79-df3031736c96',
        label: {
            name: 'Install jspm'
        },
        filename: 'jspm.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },
    {
        key: '0529b2ab-3a9f-4a79-b784-9ff451c8b8be',
        label: {
            name: 'Install composer'
        },
        filename: 'composer.installation.sh',
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'file'        
    },

    /** 
     * Installation of nodejs npm packages
     */ 
    {
        key: '3722377d-72c6-4d29-b966-dafb844fe795',
        label: {
            name: 'Install Yeoman'
        },
        command: 'npm',
        argument: ['install -g yo generator-generator'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        }, 
        implementation: 'spawn'        
    },
    {
        key: 'd59d1b82-a886-4b20-a06a-e8b03d377236',
        label: {
            name: 'prevent error permission denied when using Yeoman `yo` command'
        },
        command: 'chmod',
        argument: ['g+rwx /root'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: '4fdf7070-a91c-47e2-952b-3f7a8e0609fe',
        label: {
            name: 'nodmod - live server reloading'
        },
        command: 'npm',
        argument: ['install -g nodemon'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },
    {
        key: '57b04fad-829b-4f82-9d60-67fddcf197a0',
        label: {
            name: 'babel'
        },
        command: 'npm',
        argument: ['install -g babel-cli babel-register'],
        option: {
            shell: true,
            stdio: [0, 1, 2]
        },
        implementation: 'spawn'        
    },

];

export default {
    databaseTableName: 'unit',
    data: data
}