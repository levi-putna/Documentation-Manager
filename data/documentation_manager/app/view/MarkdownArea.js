/*
 * File: app/view/MarkdownArea.js
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

Ext.define('MyApp.view.MarkdownArea', {
    extend: 'Ext.form.field.TextArea',
    alias: 'widget.markdown_area',

    requires: [
        'MyApp.view.override.MarkdownArea'
    ],

    componentCls: 'x-markdown-field',
    name: 'content',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                render: {
                    fn: me.onTextareafieldRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTextareafieldRender: function(component, eOpts) {

    }

});