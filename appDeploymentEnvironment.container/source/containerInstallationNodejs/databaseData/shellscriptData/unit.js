let data = [
    /**
     * General conditions
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
];

export default {
    databaseTableName: 'unit',
    data: data
}