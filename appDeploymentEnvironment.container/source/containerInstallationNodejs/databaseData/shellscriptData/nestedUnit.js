let data = [
    
    {
        key: '25f4a639-3fcf-4378-9c04-60cf245cd916',
        label: {
            name: 'Linux update & upgrade packages'
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
        label: { name: 'linux upgrade' },
        unit: 'c639cd53-c764-4967-b052-1e1652107923',
        insertionPoint: [],
        children: [],
    },
    {
        key: '9477f37d-0de6-4629-a684-c00b429b8f2a',
        label: { name: 'linux update' },
        unit: '3baa9ad3-aff2-4486-a046-0b07ed7882be',
        insertionPoint: [],
        children: [],
    },
    {
        key: '62497932-fc7b-4cb5-999a-ab02c82539b5',
        label: { name: 'linux update fix-missing' },
        unit: 'e971b884-1b33-4044-9c93-162ee145b807',
        insertionPoint: [],
        children: [],
    },

];

export default {
    databaseTableName: 'nestedUnit',
    data: data
}