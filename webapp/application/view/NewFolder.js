/*
 * File: application/view/NewFolder.js
 * Date: Tue May 21 2013 15:26:35 GMT+1000 (EST)
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.NewFolder', {
    extend: 'Ext.window.Window',

    requires: [
        'MyApp.view.ClientComboBox'
    ],

    height: 294,
    width: 400,
    resizable: false,
    bodyBorder: false,
    title: 'New Folder',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    bodyPadding: 10,
                    fieldDefaults: {
                        labelAlign: 'top',
                        msgTarget: 'side'
                    },
                    pollForChanges: false,
                    method: 'POST',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        var window = this.up('form').up('window');
                                        var form = this.up('form').getForm();
                                        if (form.isValid()) {

                                            //Post form
                                            var client = Ext.create('MyApp.model.Project', form.getFieldValues());
                                            client.save({
                                                success: function(record, operation){
                                                    if (operation.wasSuccessful()) {
                                                        window.hide();
                                                    } else {

                                                    }
                                                },
                                                failure: function(record, operation){

                                                }
                                            }); //POST /invoice
                                        }
                                    },
                                    text: 'Create'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'client_combobox',
                            name: 'client_id',
                            flex: 1
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            fieldLabel: 'Project Name',
                            name: 'name',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            emptyText: 'Name',
                            maxLength: 100,
                            minLength: 3
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            fieldLabel: 'Description',
                            name: 'description'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});