/*
 * File: application/view/ProductCombo.js
 * Date: Thu May 02 2013 14:33:27 GMT+1000 (EST)
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

Ext.define('MyApp.view.ProductCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.product_combo',

    alternateClassName: [
        'ProductCombo'
    ],

    selectOnFocus: true,
    displayField: 'name',
    forceSelection: true,
    queryMode: 'local',
    store: 'Product',
    typeAhead: true,
    valueField: 'id',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                beforerender: {
                    fn: me.onComboboxBeforeRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onComboboxBeforeRender: function(component, eOpts) {
        component.listConfig = {
            getInnerTpl: function() {
                return '<div>{name}</div><div>{description}</div>';
            }
        }
    }

});