/*
 * File: application/view/MyComboBox2.js
 * Date: Wed Apr 24 2013 20:35:53 GMT+1000 (EST)
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

Ext.define('MyApp.view.MyComboBox2', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.mycombobox2',

    alternateClassName: [
        'ProductCombo'
    ],

    selectOnFocus: true,
    displayField: 'name',
    store: 'Product',
    typeAhead: true,
    valueField: 'name',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});