/*
 * File: application/model/Invoice.js
 * Date: Fri May 17 2013 15:01:13 GMT+1000 (EST)
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

Ext.define('MyApp.model.Invoice', {
    extend: 'Ext.data.Model',

    uses: [
        'MyApp.model.InvoiceStatus',
        'MyApp.model.Client'
    ],

    fields: [
        {
            mapping: 'id',
            name: 'id',
            type: 'int',
            useNull: true
        },
        {
            dateFormat: 'Y-m-d',
            dateReadFormat: '',
            mapping: 'issue_date',
            name: 'issue_date',
            sortType: 'asDate',
            type: 'date'
        },
        {
            mapping: 'client_id',
            name: 'client_id',
            type: 'int',
            useNull: true
        },
        {
            dateFormat: 'Y-m-d',
            mapping: 'due_date',
            name: 'due_date',
            sortType: 'asDate',
            type: 'date'
        },
        {
            mapping: 'payment_date',
            name: 'payment_date',
            sortType: 'asDate',
            type: 'date',
            useNull: true
        },
        {
            mapping: 'invoice_status_id',
            name: 'invoice_status_id',
            sortType: 'asInt',
            type: 'int',
            useNull: true
        },
        {
            name: 'project_id',
            type: 'int',
            useNull: true
        }
    ],

    hasOne: [
        {
            model: 'MyApp.model.InvoiceStatus',
            foreignKey: 'incoive_status_id',
            getterName: 'getStatus',
            setterName: 'setStatus'
        },
        {
            model: 'MyApp.model.Client',
            foreignKey: 'client_id',
            getterName: 'getClient()',
            setterName: 'setClient()'
        }
    ],

    proxy: {
        type: 'rest',
        url: '/api/invoice',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});