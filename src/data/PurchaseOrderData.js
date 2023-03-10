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
    { name : "Blue Band", amount : 600 },
    { name : "Indomie", amount : 50 },
    { name : "Biscuits", amount : 40 },
    { name : "Rice 1KG", amount : 260 },
    { name : "Mumias Sugar 1KG", amount : 250 },
    { name : "Cake", amount : 600 },
    { name : "Drinking Chocolate", amount : 250 },
    { name : "Minute Maid", amount : 200 }
]

// Describes the format for DevExtreme to create a summary of the table
export const summary = {
    totalItems: [
        {
        column: 'Unit Cost',
        summaryType: 'sum',
        valueFormat: {
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true
          },
        displayFormat: '{0}'
        },
        {
        column: 'Extended Cost',
        summaryType: 'sum',
        valueFormat: {
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true
          },
        displayFormat: '{0}'
        },
        {
        column: 'Tax Amount',
        summaryType: 'sum',
        valueFormat: {
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true
          },
        displayFormat: '{0}'
        },
        {
        column: 'Discount Amount',
        summaryType: 'sum',
        valueFormat: {
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true
          },
        displayFormat: '{0}'
        },
        {
        column: 'Line Total',
        summaryType: 'sum',
        valueFormat: {
            type: "fixedPoint",
            precision: 2,
            currency: "KES",
            useGrouping: true
          },
        displayFormat: '{0}'
        }
    ]
};

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

// Defines the columns to be used by the grid

const renderHeader = () => {
    return <i style={{ color: 'black' }}>Mailing Address</i>;
}

export const columns = [
    { dataField: 'itemNumber', allowEditing: false, width: 50, visible: false  },
    { dataField: 'unitCost', visible: true, allowEditing: false},
    { dataField: 'extendedCost', visible: true, allowEditing: false},
    { dataField: 'taxAmount', visible: true, allowEditing: false },
    { dataField: 'supplierCost', visible: false, allowEditing: false},
    { dataField: 'discountAmount', visible: true, allowEditing: true},
    { dataField: 'lineTotal', visible: true, allowEditing: false },
    { dataField: 'discountType', visible: false, allowEditing: false},
    { dataField: 'OUM', visible: false, allowEditing: false},
    { dataField: 'discountRate', visible: false, allowEditing: false},
    { dataField: 'taxCode', visible: false, allowEditing: false},
    { dataField: 'taxRate', visible: false, allowEditing: false},

    ];

// End of definition
