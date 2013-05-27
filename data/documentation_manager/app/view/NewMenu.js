/*
 * File: app/view/NewMenu.js
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

Ext.define('MyApp.view.NewMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.new_menu',

    width: 145,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    text: 'New Document'
                },
                {
                    xtype: 'menuitem',
                    handler: function(item, e) {
                        var x = Ext.create("MyApp.view.NewSection",{
                        }).show();
                    },
                    text: 'New Section'
                }
            ]
        });

        me.callParent(arguments);
    }

});