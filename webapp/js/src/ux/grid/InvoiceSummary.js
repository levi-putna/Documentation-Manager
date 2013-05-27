Ext.define('Ext.ux.grid.InvoiceSummary', {

    extend: 'Ext.grid.feature.Feature',

    alias: 'feature.invoicesummary',

    init: function(grid) {
        var me = this,
            view = me.view;

        me.callParent(arguments);

        me.view.addFooterFn(me.renderTFoot);

    },

 	renderTFoot: function(values, out) {
        var view = values.view,
        	me = view.findFeature('summary');v

			 me.summaryBar = grid.addDocked({
                    childEls: ['innerCt'],
                    renderTpl: [
                        '<div id="{id}-innerCt">',
                            '<table cellpadding="0" class="' + me.summaryTableCls + '">',
                                '<tr class="' + me.summaryRowCls + '"></tr>',
                            '</table>',
                        '</div>'
                    ],
                    style: 'overflow:hidden',
                    itemId: 'summaryBar',
                    cls: [ me.dockedSummaryCls, me.dockedSummaryCls + '-' + me.dock ],
                    xtype: 'component',
                    dock: me.dock,
                    weight: 10000000
                })[0];

			out.push('<tfoot>');
			out.push('<div>...</div>');
			out.push('</tfoot>');
    }
});