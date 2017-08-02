Ext.define('School.view.student.StudentListController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.student-list',

    onAddClick: function (sender, record) {

        var studentStore = this.getViewModel().getStore('StudentListStore');

        //adding dummy student
        var studentModel = Ext.create('School.model.Student');
        studentModel.set("Id", 0);
        studentModel.set("firstName", "New Student");
        studentModel.set("middleName", "");
        studentModel.set("lastName", "");
        studentModel.set("birthDate", "");
        studentModel.set("city", "");
        studentModel.set("state", "");

        studentStore.insert(0, studentModel);

        var studentGrid = this.getView();
        studentGrid.editingPlugin.startEdit(studentModel, 1);
       
    },

    onLoadClick: function (sender, record) {
        var studentStore = this.getView().getStore();
        studentStore.load();
    },

    onRemoveClick: function (sender, record) {
        var studentGrid = this.getView();
        var studentStore = studentGrid.getStore();

        //delete selected rows if selModel is checkboxmodel
        var selectedRows = studentGrid.getSelectionModel().getSelection();

        studentStore.remove(selectedRows);
    },

    onSelectionChange: function (sender, record, isSelected) {
        var removeBtn = this.lookupReference('btnRemoveStudent');
        if(record.length)
            removeBtn.setDisabled(false);
        else
            removeBtn.setDisabled(true);
    }
});