/*
 * File: application/view/InvoiceGridPanel.js
 * Date: Thu Apr 18 2013 16:09:30 GMT+1000 (EST)
 *
 * This file was generated by Sencha Architect version 2.2.1.
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

Ext.define('MyApp.view.InvoiceGridPanel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.mygridpanel',

    title: 'Invoices',
    titleCollapse: false,
    forceFit: true,
    store: 'Invoice',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            icon: '/images/add.png',
                            text: 'Add'
                        },
                        {
                            xtype: 'button',
                            icon: '/images/edit.png',
                            text: 'Edit'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            cls: 'x-btn-danger',
                            icon: '/images/delete.png',
                            text: 'Delete'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    width: 360,
                    displayInfo: true,
                    store: 'Invoice'
                }
            ],
            columns: [
                {
                    xtype: 'numbercolumn',
                    maxWidth: 100,
                    minWidth: 50,
                    defaultWidth: 50,
                    dataIndex: 'id',
                    groupable: false,
                    lockable: true,
                    text: 'ID',
                    tooltip: 'Invoice ID',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var client_store = Ext.data.StoreManager.lookup('Client');
                        return client_store.getById(value).get('name');
                    },
                    maxWidth: 500,
                    minWidth: 150,
                    defaultWidth: 150,
                    dataIndex: 'client_id',
                    groupable: true,
                    text: 'Client ID'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var project_store = Ext.data.StoreManager.lookup('Project');
                        return project_store.getById(value).get('name');
                    },
                    maxWidth: 300,
                    minWidth: 150,
                    dataIndex: 'project_id',
                    text: 'Project'
                },
                {
                    xtype: 'datecolumn',
                    maxWidth: 200,
                    minWidth: 100,
                    defaultWidth: 80,
                    dataIndex: 'issue_date',
                    text: 'Issue Date',
                    format: 'd M Y'
                },
                {
                    xtype: 'datecolumn',
                    maxWidth: 200,
                    minWidth: 100,
                    defaultWidth: 80,
                    dataIndex: 'due_date',
                    text: 'Due Date',
                    format: 'd M Y'
                },
                {
                    xtype: 'datecolumn',
                    maxWidth: 200,
                    minWidth: 100,
                    defaultWidth: 80,
                    dataIndex: 'payment_date',
                    text: 'Payment Date',
                    format: 'd M Y'
                },
                {
                    xtype: 'templatecolumn',
                    summaryType: 'sum',
                    maxWidth: 200,
                    minWidth: 100,
                    tpl: [
                        '${total}'
                    ],
                    defaultWidth: 80,
                    dataIndex: 'total',
                    groupable: true,
                    text: 'Total'
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var invoice_status_store = Ext.data.StoreManager.lookup('InvoiceStatus');
                        var name = invoice_status_store.getById(value).get('name');
                        var desplay_name = name.charAt(0).toUpperCase() + name.slice(1);

                        return '<span class="invoice-status-' + name + '">' + desplay_name + "</span>";
                    },
                    maxWidth: 200,
                    minWidth: 100,
                    dataIndex: 'invoice_status_id',
                    text: 'Status'
                }
            ],
            features: [
                {
                    ftype: 'grouping'
                }
            ]
        });

        me.callParent(arguments);
    }

});