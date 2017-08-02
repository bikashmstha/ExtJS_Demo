Ext.define('School.view.student.StudentListPaging', {
    extend: 'Ext.grid.Panel',
    xtype: 'studentListPaging',

    title: 'Student List - Paging Demo',
    controller: 'student-list',
    viewModel: { type: 'studentviewmodel' },
    selType: 'rowmodel',
    selModel:
    {
        mode: 'SINGLE'
    },
    viewConfig:
    {
        stripeRows: true
    },
    listeners: {
        selectionchange: 'onSelectionChange'
    },
    bind: {
        store: '{StudentListPagingStore}'
    },
    initComponent: function () {
        Ext.apply(this,
            {
                columns: [{
                    text: "Id",
                    dataIndex: 'Id',
                    width: 35
                },
                {
                    text: "First Name",
                    flex: 1,
                    dataIndex: 'firstName'
                },
                {
                    text: "Middle Name",
                    flex: 1,
                    dataIndex: 'middleName'
                },
                {
                    text: "Last Name",
                    flex: 1,
                    dataIndex: 'lastName'
                },
                {
                    xtype: 'datecolumn',
                    header: "Birth Date",
                    width: 135,
                    dataIndex: 'birthDate',
                    renderer: Ext.util.Format.dateRenderer('d/m/Y')
                },
                {
                    text: "City",
                    flex: 1,
                    dataIndex: 'city'
                },
                {
                    text: "State",
                    flex: 1,
                    dataIndex: 'state'
                }],
                bbar: [{
                    xtype: 'pagingtoolbar',
                    bind: {
                        store: '{StudentListPagingStore}'
                    },
                    displayInfo: true,
                    displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
                    emptyMsg: "No records to display&nbsp;"
                }]

            });

        this.callParent(arguments);
    }
});