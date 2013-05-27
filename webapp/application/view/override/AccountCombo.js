Ext.define('MyApp.view.override.AccountCombo', {
    override: 'MyApp.view.AccountCombo',
    
     constructor: function (args) {
        var me = this;
        var groupField = "account_type_id";
         

        args.tpl = new Ext.XTemplate(
            '<tpl for=".">',
            	'<tpl if="this.' + groupField + ' != values.' + groupField + '">',
            		'<tpl exec="this.' + groupField + ' = values.' + groupField + '"></tpl>',
            		'<div class="x-combo-group"><div class="x-combo-group-title">{' + groupField + '}</div></div>',
            	'</tpl>',
            	'<div class="x-boundlist-item"><b>{number}</b> - {name}</div>',
            '</tpl>'
        );

        me.callParent(arguments);
    }
    
});