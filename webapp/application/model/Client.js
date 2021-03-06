/*
 * File: application/model/Client.js
 * Date: Thu May 16 2013 15:11:03 GMT+1000 (EST)
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

Ext.define('MyApp.model.Client', {
    extend: 'Ext.data.Model',

    uses: [
        'MyApp.model.Invoice'
    ],

    fields: [
        {
            name: 'id',
            sortType: 'asInt',
            type: 'int',
            useNull: true
        },
        {
            name: 'abn'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'postcode',
            type: 'int',
            useNull: true
        },
        {
            name: 'address',
            type: 'string',
            useNull: true
        },
        {
            name: 'client_type_id',
            type: 'int'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/client',
        reader: {
            type: 'json',
            root: 'data'
        }
    },

    belongsTo: {
        model: 'MyApp.model.Invoice',
        primaryKey: 'client_id',
        foreignKey: 'id'
    }
});