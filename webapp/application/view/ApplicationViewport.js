/*
 * File: application/view/ApplicationViewport.js
 * Date: Sun May 05 2013 10:00:37 GMT+1000 (EST)
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

Ext.define('MyApp.view.ApplicationViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'MyApp.view.InvoiceTree',
        'MyApp.view.InvoiceGrid',
        'MyApp.view.InvoiceForm',
        'MyApp.view.ClinetTab',
        'MyApp.view.ProductGrid',
        'MyApp.view.ProductForm',
        'MyApp.view.ClientTabPanel'
    ],

    layout: {
        type: 'border'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'header',
                    region: 'north',
                    height: 100,
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {
                            xtype: 'image',
                            region: 'west',
                            width: 250,
                            alt: 'Logo',
                            src: 'images/logo.gif',
                            title: 'Logo'
                        },
                        {
                            xtype: 'toolbar',
                            region: 'center',
                            cls: 'toolbar-header',
                            id: 'toolbar-header',
                            enableOverflow: true,
                            items: [
                                {
                                    xtype: 'tbfill'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        Ext.getCmp('body').getLayout().setActiveItem('body_invoice');
                                    },
                                    enableToggle: true,
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    text: 'Invoices'
                                },
                                {
                                    xtype: 'button',
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'medium',
                                    text: 'Stock',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'medium',
                                    text: 'Banking'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        Ext.getCmp('body').getLayout().setActiveItem('body_client');
                                    },
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'large',
                                    text: 'Clients'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        //Ext.getCmp('panel id').getLayout().getActiveItem()
                                        //mainView = this.getMain();
                                        //        mainView.setActiveItem('testsecond');
                                        //        mainView.show();

                                        //this.getMain().setActiveItem('testfirst', { type: 'slide', direction: 'right' });
                                        //        this.getMain().show();

                                        //Ext.getCmp('mainContainer').getLayout().setActiveItem(0);

                                        Ext.getCmp('mainContainer').getLayout().setActiveItem(1);
                                    },
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'large',
                                    text: 'Payroll'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        //Ext.getCmp('panel id').getLayout().getActiveItem()
                                        //mainView = this.getMain();
                                        //        mainView.setActiveItem('testsecond');
                                        //        mainView.show();

                                        //this.getMain().setActiveItem('testfirst', { type: 'slide', direction: 'right' });
                                        //        this.getMain().show();

                                        //Ext.getCmp('mainContainer').getLayout().setActiveItem(0);

                                        Ext.getCmp('mainContainer').getLayout().setActiveItem(1);
                                    },
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'large',
                                    text: 'Reporting'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, event) {
                                        //Ext.getCmp('panel id').getLayout().getActiveItem()
                                        //mainView = this.getMain();
                                        //        mainView.setActiveItem('testsecond');
                                        //        mainView.show();

                                        //this.getMain().setActiveItem('testfirst', { type: 'slide', direction: 'right' });
                                        //        this.getMain().show();

                                        //Ext.getCmp('mainContainer').getLayout().setActiveItem(0);

                                        Ext.getCmp('mainContainer').getLayout().setActiveItem(1);
                                    },
                                    icon: '/images/16/invoice.png',
                                    iconAlign: 'top',
                                    scale: 'large',
                                    text: 'Help'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    region: 'center',
                    id: 'body',
                    layout: {
                        type: 'card'
                    },
                    items: [
                        {
                            xtype: 'container',
                            id: 'body_invoice',
                            width: 150,
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'invoice_tree',
                                    id: 'invoice_tree',
                                    itemId: 'invoice_tree',
                                    region: 'west',
                                    split: true
                                },
                                {
                                    xtype: 'container',
                                    region: 'center',
                                    id: 'mainContainer',
                                    itemId: 'mainContainer',
                                    layout: {
                                        type: 'card'
                                    },
                                    items: [
                                        {
                                            xtype: 'mygridpanel',
                                            icon: '/images/16/invoice.png'
                                        },
                                        {
                                            xtype: 'invoice_form',
                                            id: 'form_invoice',
                                            itemId: 'form_invoice'
                                        },
                                        {
                                            xtype: 'ClientTab'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'body_product',
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'product_grid',
                                    id: 'grid_product_menu',
                                    itemId: 'grid_product_menu',
                                    region: 'west',
                                    split: true
                                },
                                {
                                    xtype: 'product_form',
                                    id: 'form_product',
                                    itemId: 'form_product',
                                    region: 'center'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'body_client',
                            layout: {
                                type: 'border'
                            },
                            items: [
                                {
                                    xtype: 'product_grid',
                                    id: 'grid_client_menu',
                                    itemId: 'grid_client_menu',
                                    store: 'Client',
                                    region: 'west',
                                    split: true
                                },
                                {
                                    xtype: 'client_tab_panel',
                                    region: 'center'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('body').getLayout().setActiveItem('body_product');
    }

});