Ext.define('School.view.student.StudentViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.studentviewmodel',
    stores: {
        StudentListStore: {
            model: 'School.model.Student',
            autoLoad: true,
            autoSync: true,
            proxy:
            {
                type: 'ajax',
                pageSize: 0,
                reader:
                {
                    rootProperty: 'result',
                    type: 'json'
                },
                url: '/students/getstudentsnopaging',
                writer: {
                    type: 'json',
                    dateFormat: 'd/m/Y',
                    writeAllFields: true
                }
            }
        },
        StudentListPagingStore: {
            model: 'School.model.Student',
            autoLoad: true,
            pageSize: 5,
            proxy:
           {
               type: 'rest',
               reader:
               {
                   rootProperty: 'result',
                   type: 'json',
                   totalProperty: 'TotalCount'
               },
               url: '/students/getstudents'
           }
        }

    }
});