Ext.define('MyApp.view.override.InvoiceItemsGrid', {
    override: 'MyApp.view.InvoiceItemsGrid',
    
    initComponent: function() {
    	var me = this;

    	Ext.applyIf(me, {
            features: [{
                    ftype: 'invoicesummary'
            }]
    	});

    	me.callParent(arguments);
	}
    
});