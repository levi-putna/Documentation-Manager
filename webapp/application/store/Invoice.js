/*
 * File: application/store/Invoice.js
 * Date: Tue May 07 2013 18:11:05 GMT+1000 (EST)
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

Ext.define('MyApp.store.Invoice', {
    extend: 'Ext.data.Store',

    requires: [
        'MyApp.model.Invoice'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            autoSync: true,
            model: 'MyApp.model.Invoice',
            remoteFilter: true,
            remoteSort: true,
            storeId: 'StoreInvoce',
            pageSize: 50,
            remoteGroup: true
        }, cfg)]);
    }
});