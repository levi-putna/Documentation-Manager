/*
 * File: app/view/NewSection.js
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

Ext.define('MyApp.view.NewSection', {
    extend: 'Ext.window.Window',

    height: 312,
    width: 450,
    layout: {
        type: 'fit'
    },
    title: 'New Section',
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
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    action: 'new-section',
                                    text: 'Add'
                                },
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    text: 'Cancle'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'hiddenfield',
                            fieldLabel: 'Label',
                            name: 'status_id',
                            value: 1
                        },
                        {
                            xtype: 'combobox',
                            flex: 0,
                            fieldLabel: 'Document',
                            name: 'document_id',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            displayField: 'title',
                            forceSelection: true,
                            store: 'Document',
                            typeAhead: true,
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            flex: 0,
                            fieldLabel: 'Parent',
                            name: 'parent_id',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            displayField: 'title',
                            forceSelection: true,
                            store: 'Section',
                            typeAhead: true,
                            valueField: 'id'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Title',
                            name: 'title',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            maxLength: 100
                        },
                        {
                            xtype: 'textareafield',
                            flex: 1,
                            fieldLabel: 'Description',
                            name: 'description'
                        }
                    ],
                    listeners: {
                        beforerender: {
                            fn: me.onFormBeforeRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onFormBeforeRender: function(component, eOpts) {
        var tree = Ext.getCmp('section_tree');
        var form = this.down('form').getForm();
        var record = tree.contextRecord;

        if(record != null){
            //hide the new document option if we are are in a section node
            if(record.data.object_type == "Section"){
                var document_field = form.findField('document_id');
                var parent_field = form.findField('parent_id');

                document_field.destroy();
                parent_field.setValue(record.data.object_id);
            }
        }else{
            var parent_field = form.findField('parent_id');
            parent_field.destroy();
        }

        tree.contextRecord = null;
    }

});