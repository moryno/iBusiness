export const formfields = {
    'Cost Center' : "",
    'Supplier' : "",
    'Ship To' : "",
    'Order Date' : new Date(),
    'Order Amount' : '',
    'Delivery Period (Days)' : '',
    'First Delivery Date' : new Date(),
    'Vehicle/Driver Details' : '', 
    'Narration' : ''
};

export const items = [
    { "name" : "Blue Band", "amount" : 600 },
    { "name" : "Indomie", "amount" : 50 },
    { "name" : "Biscuits", "amount" : 40 },
    { "name" : "Rice 1KG", "amount" : 260 },
    { "name" : "Mumias Sugar 1KG", "amount" : 250 },
    { "name" : "Cake", "amount" : 600 },
    { "name" : "Drinking Chocolate", "amount" : 250 },
    { "name" : "Minute Maid", "amount" : 200 }
]

// Describes the format for DevExtreme to create a summary of the table
export const summary = {
    totalItems: [
        {
        column: 'Unit Cost',
        summaryType: 'sum',
        displayFormat: '{0}.00'
        },
        {
        column: 'Extended Cost',
        summaryType: 'sum',
        displayFormat: '{0}.00'
        },
        {
        column: 'Tax Amount',
        summaryType: 'sum',
        displayFormat: '{0}.00'
        },
        {
        column: 'Discount Amount',
        summaryType: 'sum',
        displayFormat: '{0}.00'
        },
        {
        column: 'Line Total',
        summaryType: 'sum',
        displayFormat: '{0}.00'
        }
    ]
};

// End of definition


// Defines the columns to be used by the grid
export const columns = [
    { dataField: 'itemNumber', allowEditing: false, width: 50, visible: false  },
    { dataField: 'item', allowEditing: false },
    { dataField: 'quantity', allowEditing: true },
    { dataField: 'unitCost', allowEditing: false},
    { dataField: 'extendedCost', allowEditing: false},
    { dataField: 'taxAmount', allowEditing: false },
    { dataField: 'supplierCost', allowEditing: false},
    { dataField: 'discountAmount', allowEditing: false},
    { dataField: 'lineTotal', allowEditing: false },
    { dataField: 'discountType', allowEditing: false},
    { dataField: 'OUM', allowEditing: false},
    { dataField: 'discountRate', allowEditing: false},
    { dataField: 'taxCode', allowEditing: false},
    { dataField: 'taxRate', allowEditing: false},

    ];

// End of definition

// Sample center options

export const centerOptions = [
    { value: 1, text: 'Nairobi' },
    { value: 2, text: 'Kisumu' },
    { value: 3, text: 'Eldoret' },
    { value: 4, text: 'Thika' },
    { value: 5, text: 'Nyeri' },
    { value: 6, text: 'Mombasa' },
    { value: 7, text: 'Embu' }
];