let data = [
    
    /**
     * Downlaod docker compose & Run conatinaers
     */
    {
        key: '0676d0b7-aa35-47fa-ac63-59fc594356eb',
        label: {
            name: 'Download docker-compose & Then run containers for build'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'chronological'
            },
            {
                key: '4a441cfc-2dd4-4fbc-83ae-55ac24d9661d',
                order: 2, 
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: '25f4a639-3fcf-4378-9c04-60cf245cd916',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '3c2b14ae-7977-4029-bc54-1acc51f129a5',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '4a441cfc-2dd4-4fbc-83ae-55ac24d9661d'
                }
            },

        ],
    },

    /**
     * Run containers
     */
    {
        key: '3c2b14ae-7977-4029-bc54-1acc51f129a5',
        label: {
            name: 'Run containers'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'allPromise'
            },
            {
                key: '419cd911-9bf6-45ef-8534-565dcec6e093',
                order: 2, 
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: '92826780-d0b0-4fb9-964e-2945d7a03bfc',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: 'aaa32384-8d13-4424-8853-dd62141a91b9',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '561b4a35-5250-439d-a692-2a761aa714ef',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '419cd911-9bf6-45ef-8534-565dcec6e093'
                }
            },

        ],
    },
    {
        key: '92826780-d0b0-4fb9-964e-2945d7a03bfc',
        label: { name: 'run rethinkdb temporary container' },
        unit: '63fa6973-58c1-4ae9-b2c3-3a001d94cedd',
        insertionPoint: [],
        children: [],
    },
    {
        key: 'aaa32384-8d13-4424-8853-dd62141a91b9',
        label: { name: 'run dockerfile build container' },
        unit: 'bcc280d1-2dd3-4e57-be19-a11821adc2d4',
        insertionPoint: [],
        children: [],
    },
    {
        key: '561b4a35-5250-439d-a692-2a761aa714ef',
        label: { name: 'stop/remove container rethinkdb which was used for build' },
        unit: '7aac8cd8-9399-471c-a14f-a281ea086550',
        insertionPoint: [],
        children: [],
    },


    /**
     * Install docker-compose
     */
    {
        key: '25f4a639-3fcf-4378-9c04-60cf245cd916',
        label: {
            name: 'Install Docker Compose'
        },
        insertionPoint: [
            {
                key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
                order: 1, 
                executionType: 'chronological'
            },
        ],
        children: [
            {
                nestedUnit: 'c5a2a235-e7e0-4534-a671-2d651a3a757d',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '9477f37d-0de6-4629-a684-c00b429b8f2a',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },
            {
                nestedUnit: '62497932-fc7b-4cb5-999a-ab02c82539b5',
                pathPointerKey: 'XYZ3',
                insertionPosition: {
                    insertionPathPointer: null, 
                    insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
                }
            },

        ],
    },
    {
        key: 'c5a2a235-e7e0-4534-a671-2d651a3a757d',
        label: { name: 'download docker compose latest version' },
        unit: '66181bdc-16f2-4fb3-af1f-4fe301ab6a18',
        insertionPoint: [],
        children: [],
    },
    {
        key: '9477f37d-0de6-4629-a684-c00b429b8f2a',
        label: { name: 'install downloaded docker-compose' },
        unit: 'fa4c633a-24a0-4255-834f-0181a6ce48f0',
        insertionPoint: [],
        children: [],
    },
    {
        key: '62497932-fc7b-4cb5-999a-ab02c82539b5',
        label: { name: 'print version' },
        unit: '49f404a4-d0f6-41a5-9b66-0e5136c76ddb',
        insertionPoint: [],
        children: [],
    },

];

export default {
    databaseTableName: 'nestedUnit',
    data: data
}