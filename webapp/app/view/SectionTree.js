/*
 * File: app/view/SectionTree.js
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

Ext.define('MyApp.view.SectionTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.section_tree',

    requires: [
        'MyApp.view.ClearTriggerField',
        'MyApp.view.NewMenu'
    ],

    maxWidth: 400,
    minWidth: 150,
    width: 250,
    bodyBorder: false,
    collapsible: true,
    header: false,
    titleCollapse: false,
    hideHeaders: true,
    store: 'DocumentTree',
    animate: false,
    folderSort: true,
    lines: false,
    rootVisible: false,
    useArrows: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'clear_trigger_field'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            text: 'New',
                            menu: {
                                xtype: 'new_menu'
                            }
                        }
                    ]
                }
            ],
            viewConfig: {
                autoScroll: true,
                stripeRows: true,
                plugins: [
                    Ext.create('Ext.tree.plugin.TreeViewDragDrop', {
                        allowParentInserts: true,
                        nodeHighlightOnDrop: true,
                        nodeHighlightOnRepair: true
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

                    break;
                    case "no":

                    break;
                } 	
            }
        });

    },

    onViewNodeDragOver: function(targetNode, position, dragData, e, eOpts) {
        return true;
    },

    onTreepanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        e.stopEvent();
        this.contextRecord = record;

        var menu = Ext.create('MyApp.view.TreeContextMenu', {});

        menu.showAt(e.getXY());
    }

});