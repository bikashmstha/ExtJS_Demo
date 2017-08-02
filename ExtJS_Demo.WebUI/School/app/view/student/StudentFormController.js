Ext.define('School.view.student.StudentFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.student-form',

    onCreateClick: function (sender, record) {
        var studentForm = this.getView().getForm();

        if (!studentForm.isDirty()) {
            Ext.Msg.alert('Status', 'No new data to create.');
            return;
        }
        else if (!studentForm.isValid()) {
            Ext.Msg.alert('Status', 'Invalid data.');
            return;
        }

        // Submit the Ajax request and handle the response
        studentForm.submit({
            url: '/students/student',
            waitMsg: 'Saving..',
            headers:
            {
                'Content-Type': 'application/json'
            },
            clientValidation: true,
            submitEmptyText: true,
            success: function (form, action) {

                var student = Ext.create('School.model.Student');
                var resp = Ext.decode(action.response.responseText);

                if (resp.data[0]) {
                    // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                    student.set(resp.data[0]);
                    studentForm.loadRecord(student);
                }

                Ext.Msg.alert('Status', 'Saved successfully.');

            },
            failure: function (form, action) {
                if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                    Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                }
                if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                    Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                }
                if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                    Ext.Msg.alert('SERVER_INVALID', action.result.message);
                }
            }
        });
    },

    onReadClick: function (sender, record) {
        var studentForm = this.getView().getForm();

        //result should contain success=true and data property otherwise it will go to failure even if there is no failure
        studentForm.load({
            waitMsg: 'Loading...',
            method: 'GET',
            url: 'http://localhost:55991/students/getstudent/',
            params:
            {
                id: 1
            },
            success: function (form, action) {
                try {
                    var resp = Ext.decode(action.response.responseText);

                    if (resp.data.length > 0) {
                        // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                        var student = Ext.create('School.model.Student');
                        student.set(resp.data[0]);
                        studentForm.loadRecord(student);
                    }
                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                }
            },
            failure: function (form, action) {
                Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
        });
    },

    onUpdateClick: function (sender, record) {
        var studentForm = this.getView().getForm();

        if (!studentForm.isDirty()) {
            Ext.Msg.alert('Status', 'No pending changes to save.');
            return;
        }
        else if (!studentForm.isValid()) {
            Ext.Msg.alert('Status', 'Invalid data.');
            return;
        }

        studentForm.submit({
            url: '/api/student',
            waitMsg: 'Updating..',
            method: 'PUT',
            headers:
            {
                'Content-Type': 'application/json'
            },
            clientValidation: true,
            success: function (form, action) {
                try {
                    var student = Ext.create('School.model.Student');
                    var resp = Ext.decode(action.response.responseText);

                    if (resp.data.length > 0) {
                        // addstudent returns student model with Id so we can re-load model into form so form will have isDirty false
                        student.set(resp.data[0]);
                        studentForm.loadRecord(student);
                    }

                    Ext.Msg.alert('Status', 'Saved successfully.');
                }
                catch (ex) {
                    Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                }
            },
            failure: function (form, action) {
                if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                    Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                }
                if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                    Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                }
                if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                    Ext.Msg.alert('SERVER_INVALID', action.result.message);
                }
            }
        });
    },
    onDeleteClick: function (sender, record) {
        var me = this,
            studentForm = me.getView();

        if (!studentForm.getValues(false, false, false, true).Id) {
            Ext.Msg.alert('Status', 'Invalid or No data to delete.');
            return;
        }

        var student = Ext.create('School.model.Student'), data;

        student.set(studentForm.getValues());
        data = student.getData();

        Ext.Msg.show({
            title: 'Delete',
            msg: 'Do you want to delete this record? ',
            width: 300,
            closable: false,
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonValue, inputText, showConfig) {
                if (buttonValue === 'yes') {

                    studentForm.submit({
                        url: '/api/student',
                        method: 'DELETE',
                        clientValidation: true,
                        waitMsg: 'Deleting..',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },

                        success: function (form, action) {
                            try {
                                var resp = Ext.decode(action.response.responseText);
                                studentForm.clearForm();

                                Ext.Msg.alert('Success', resp.message);
                            }
                            catch (ex) {
                                Ext.Msg.alert('Status', 'Exception: ' + ex.Message);

                            }
                        },
                        failure: function (form, action) {
                            if (action.failureType === Ext.form.action.Action.CLIENT_INVALID) {
                                Ext.Msg.alert('CLIENT_INVALID', 'Something has been missed. Please check and try again.');
                            }
                            if (action.failureType === Ext.form.action.Action.CONNECT_FAILURE) {
                                Ext.Msg.alert('CONNECT_FAILURE', 'Status: ' + action.response.status + ': ' + action.response.statusText);
                            }
                            if (action.failureType === Ext.form.action.Action.SERVER_INVALID) {
                                Ext.Msg.alert('SERVER_INVALID', action.result.message);
                            }
                        }
                    });
                }
            }

        });
    },
    onResetClick: function (sender, record) {
        this.getView().getForm().reset();
    },
    onClearClick: function (sender, record) {
        this.getView().clearForm();
    },

});