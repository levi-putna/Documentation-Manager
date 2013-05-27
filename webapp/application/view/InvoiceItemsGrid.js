/*
 * File: application/view/InvoiceItemsGrid.js
 * Date: Thu May 16 2013 14:53:57 GMT+1000 (EST)
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

Ext.define('MyApp.view.InvoiceItemsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoice_items_grid',

    requires: [
        'MyApp.view.ProductCombo',
        'MyApp.view.AccountCombo',
        'MyApp.view.TaxRateCombo'
    ],

    frame: true,
    id: 'invoice_item_grid',
    bodyBorder: true,
    title: 'Invoice Items',
    columnLines: true,
    forceFit: true,
    store: 'InvoiceItem',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            columns: [
                {
                    xtype: 'rownumberer',
                    maxWidth: 25,
                    minWidth: 25,
                    width: 25
                },
                {
                    xtype: 'numbercolumn',
                    hidden: true,
                    maxWidth: 100,
                    minWidth: 50,
                    width: 50,
                    resizable: false,
                    defaultWidth: 50,
                    align: 'right',
                    dataIndex: 'id',
                    text: 'Record Id',
                    format: '0'
                },
                {
                    xtype: 'gridcolumn',
                    maxWidth: 100,
                    minWidth: 80,
                    width: 100,
                    dataIndex: 'product_id',
                    text: 'Product ID',
                    editor: {
                        xtype: 'product_combo',
                        actiuon: 'update',
                        listeners: {
                            change: {
                                fn: me.onComboboxChange,
                                scope: me
                            }
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    minWidth: 150,
                    width: 200,
                    resizable: false,
                    defaultWidth: 200,
                    sortable: false,
                    dataIndex: 'description',
                    menuDisabled: true,
                    text: 'Description',
                    editor: {
                        xtype: 'combobox',
                        hideTrigger: true,
                        displayField: 'name',
                        store: 'Product',
                        valueField: 'name'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var lookup_store = Ext.data.StoreManager.lookup('Account');
                        var lookup_record = lookup_store.getById(parseInt(value));

                        if(lookup_record == null){
                            return '';
                        }else{
                            return lookup_record.get('name');
                        }

                    },
                    maxWidth: 150,
                    minWidth: 100,
                    width: 150,
                    sortable: false,
                    dataIndex: 'sales_account_id',
                    menuDisabled: true,
                    text: 'Sales Account',
                    editor: {
                        xtype: 'account_combo',
                        matchFieldWidth: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    maxWidth: 110,
                    minWidth: 50,
                    width: 100,
                    resizable: false,
                    sortable: false,
                    dataIndex: 'qty',
                    menuDisabled: true,
                    text: 'Qty/Hrs',
                    editor: {
                        xtype: 'numberfield',
                        selectOnFocus: true,
                        minValue: 1
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '$0,000.00');
                    },
                    summaryRenderer: function(val, params, data) {
                        return 'Total';
                    },
                    maxWidth: 100,
                    minWidth: 50,
                    width: 100,
                    resizable: false,
                    sortable: false,
                    dataIndex: 'retail_price',
                    menuDisabled: true,
                    text: 'Price',
                    editor: {
                        xtype: 'numberfield',
                        selectOnFocus: true,
                        minValue: 0
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        var tax_rate_store = Ext.data.StoreManager.lookup('TaxRate');

                        if(value){
                            return tax_rate_store.getById(value).get('key');
                        }
                    },
                    maxWidth: 100,
                    minWidth: 50,
                    width: 100,
                    sortable: false,
                    dataIndex: 'tax_rate_id',
                    menuDisabled: true,
                    text: 'Tax Rate',
                    editor: {
                        xtype: 'tax_rate_combo',
                        matchFieldWidth: false
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.css = 'cell-total';

                        var total = (record.data.retail_price * record.data.qty);
                        return Ext.util.Format.number(total, '$0,000.00');
                    },
                    cls: 'row-total',
                    maxWidth: 100,
                    minWidth: 50,
                    width: 100,
                    resizable: false,
                    sortable: false,
                    menuDisabled: true,
                    text: 'Total'
                },
                {
                    xtype: 'actioncolumn',
                    draggable: false,
                    maxWidth: 25,
                    minWidth: 25,
                    width: 25,
                    resizable: false,
                    defaultWidth: 25,
                    hideable: false,
                    menuDisabled: true,
                    tooltip: 'Remove an invoice item',
                    items: [
                        {
                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                var store = record.store;

                                store.remove(record);
                                if(store.getCount() == 0){
                                    var invoice_item = Ext.create('MyApp.model.InvoiceItem');
                                    store.insert(0, invoice_item);
                                }
                            },
                            action: 'removeRow',
                            icon: '/images/16/delete.png'
                        }
                    ]
                }
            ],
            viewConfig: {
                loadMask: false,
                plugins: [
                    Ext.create('Ext.grid.plugin.DragDrop', {

                    })
                ]
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ]
        });

        me.callParent(arguments);
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if(newValue != oldValue){
            var product = field.getStore().getById(newValue).data;
            var item = eOpts.scope.editingPlugin.activeRecord;

            //set values
            item.set('description', product.name);
            item.set('sales_account_id', product.sales_account_id);
            item.set('qty', 1);
            item.set('retail_price', product.retail_price);
            item.set('tax_rate_id', product.tax_rate_id);

            field.up('grid').fireEvent("editorchange", field, newValue, oldValue);

        }
    }

});