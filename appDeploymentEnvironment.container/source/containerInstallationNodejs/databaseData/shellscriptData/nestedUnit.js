let data = [
    
    /**
     * Port: WebappUI
     */
    // {
    //     key: 'default',
    //     label: {
    //         name: 'GET'
    //     },
    //     conditionImplementation: 'c639cd53-c764-4967-b052-1e1652107923',
    //     callback: { // fallback function.
    //         name: '518d7b08-f825-486d-be88-1a4df2653022',
    //         type: 'document'
    //     },
    //     insertionPoint: [
    //         {
    //             key: '2299cc1e-238f-4fe5-9069-51351ded59a7',
    //             order: 1, 
    //             executionType: 'raceFirstPromise'
    //         },
    //         {
    //             key: '13a170c5-be67-4a60-9630-b9d0750641f4',
    //             order: 2, 
    //             executionType: 'raceFirstPromise'
    //         },
    //     ],
    //     children: [
    //         {
    //             nestedUnit: 'ff727650-6dfb-48bf-bfc7-be4ad6a6bcdd', // TODO: CHANGE NAME TO conditionTreeKey
    //             pathPointerKey: 'XYZ2',
    //             insertionPosition: {
    //                 insertionPathPointer: null, 
    //                 insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
    //             }
    //         },
    //         {
    //             nestedUnit: '25f4a639-3fcf-4378-9c04-60cf245cd916', // TODO: CHANGE NAME TO conditionTreeKey
    //             pathPointerKey: 'XYZ1',
    //             insertionPosition: {
    //                 insertionPathPointer: null, 
    //                 insertionPoint: '2299cc1e-238f-4fe5-9069-51351ded59a7'
    //             }
    //         },
    //         {
    //             nestedUnit: 'ab9c2538-cd9e-40d6-9a93-5296db445035', // TODO: CHANGE NAME TO conditionTreeKey
    //             pathPointerKey: 'XYZ3',
    //             insertionPosition: {
    //                 insertionPathPointer: null, 
    //                 insertionPoint: '13a170c5-be67-4a60-9630-b9d0750641f4'
    //             }
    //         },
    //     ],
    // },
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