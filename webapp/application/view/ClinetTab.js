/*
 * File: application/view/ClinetTab.js
 * Date: Wed May 01 2013 17:51:50 GMT+1000 (EST)
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

Ext.define('MyApp.view.ClinetTab', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ClientTab',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    title: 'Details',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            anchor: '100%',
                            boxLabel: 'Reportable'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'buisness_name',
                            itemId: 'buisness_name',
                            fieldLabel: 'Buisness Name'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            id: 'buisness_email',
                            itemId: 'buisness_email',
                            fieldLabel: 'Buisness Email',
                            vtype: 'email'
                        },
                        {
                            xtype: 'fieldset',
                            checkboxToggle: true,
                            title: 'Buisness Address',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    anchor: '100%',
                                    id: 'buisness_address',
                                    itemId: 'buisness_address',
                                    fieldLabel: 'Address'
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    height: 120,
                                    layout: {
                                        type: 'column'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'City/Town'
                                        },
                                        {
                                            xtype: 'triggerfield',
                                            fieldLabel: 'Country'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Post code'
                                        },
                                        {
                                            xtype: 'triggerfield',
                                            fieldLabel: 'State/Region'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'hiddenfield',
                                    anchor: '100%',
                                    id: 'id',
                                    itemId: 'id'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'Phone Number'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '100%',
                            fieldLabel: 'ABN'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: 'Invoice'
                },
                {
                    xtype: 'panel',
                    title: 'Notes'
                },
                {
                    xtype: 'form',
                    bodyPadding: 10,
                    title: 'Projects'
                }
            ]
        });

        me.callParent(arguments);
    }

});