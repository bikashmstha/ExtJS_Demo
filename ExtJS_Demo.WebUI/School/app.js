/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
// Ext.application({
//     extend: 'School.Application',

//     name: 'School',

//     requires: [
//         // This will automatically load all classes in the School namespace
//         // so that application classes do not need to require each other.
//         'School.*'
//     ],

//     // The name of the initial view to create.
//     mainView: 'School.view.main.Main'
// });


Ext.application({
    name: 'School',

    extend: 'School.Application',

    requires: [
        'School.view.main.Main'
    ],


    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'School.view.main.Main'
    
    //-------------------------------------------------------------------------
    // Most customizations should be made to School.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});