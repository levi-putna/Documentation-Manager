/*
 * File: application/view/ClearTriggerField.js
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

Ext.define('MyApp.view.ClearTriggerField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.cleartrigger',

    requires: [
        'MyApp.view.override.ClearTriggerField'
    ],

    blankText: 'Filter',
    emptyText: 'Filter',
    triggerCls: 'x-form-clear-trigger',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});