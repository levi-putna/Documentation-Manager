/*
 * File: application/view/InvoiceTree.js
 * Date: Mon May 20 2013 13:20:37 GMT+1000 (EST)
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

Ext.define('MyApp.view.InvoiceTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.invoice_tree',

    requires: [
        'MyApp.view.ClearTriggerField',
        'MyApp.view.NewItemMenu'
    ],

    itemId: 'InvoiceTree',
    maxWidth: 350,
    minWidth: 150,
    width: 250,
    bodyBorder: true,
    collapsed: false,
    collapsible: true,
    header: false,
    hideCollapseTool: true,
    overlapHeader: false,
    titleCollapse: false,
    forceFit: false,
    store: 'InvoiceTree',
    folderSort: false,
    rootVisible: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            viewConfig: {
                autoScroll: true,
                stripeRows: true,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                        allowParentInserts: true,
                        appendOnly: true,
                        sortOnDrop: true
                    })
                ],
                listeners: {
                    nodedragover: {
                        fn: me.onViewNodeDragOver,
                        scope: me
                    },
                    beforedrop: {
                        fn: me.onTreeViewDragDropBeforeDrop,
                        scope: me
                    }
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'cleartrigger'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            icon: '/images/settings.png',
                            menu: {
                                xtype: 'new_item_menu'
                            }
                        }
                    ]
                }
            ],
            listeners: {
                itemcontextmenu: {
                    fn: me.onTreepanelItemContextMenu,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTreeViewDragDropBeforeDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts) {
        var dragNodeName = data.records[0].data.text;
        var dragNodeType = data.records[0].data.object_type;
        var dropNodeName = overModel.data.text;
        console.log(data);
        //wait until confirmation complete
        dropHandlers.wait = true;

        Ext.Msg.show({
            title: 'Confirm Move',
            width : 400,
            msg: 'Are you sure you want to move <b>' + dragNodeType + ' ' + dragNodeName + '</b> to  <b>' + dropNodeName + '</b>?',
            buttons: Ext.Msg.YESNO,
            closable: false,
            fn: function (btn) {
                switch (btn) {
                    case "yes":
                    dropHandlers.processDrop();
                    Ext.get(data.item.id).highlight("54a954", {
                        attr: "backgroundColor",
                        easing: 'easeIn',
                        duration: 2000
                    });
                    break;
                    case "no":
                    Ext.get(data.item.id).el.highlight("f99826", {
                        attr: "backgroundColor",
                        easing: 'easeIn',
                        duration: 2000
                    });
                    break;
                } 	
            }
        });





    },

    onViewNodeDragOver: function(targetNode, position, dragData, e, eOpts) {
        var record = dragData.records[0];
        var target_type = record.data.object_type;
        var drop_type = targetNode.data.object_type;

        if((target_type == "Invoice" && drop_type == "Project") || (target_type == "Invoice" && drop_type == "Client")){
            return true; 
        }

        return false;
    },

    onTreepanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        e.stopEvent();
        var type = record.data.object_type;
        var id = record.data.id;

        console.log("-->", record.data.object_type);

        var menu = Ext.create('MyApp.view.TreeContextMenu', {});
        menu.setContex(record);

        menu.showAt(e.getXY());
        e.stopEvent();
    }

});