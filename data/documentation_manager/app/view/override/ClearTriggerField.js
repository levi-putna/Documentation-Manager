Ext.define('MyApp.view.override.ClearTriggerField', {
    override: 'MyApp.view.ClearTriggerField',
    
    trigger1Class: 'x-form-clear-trigger',
    trigger2Class: 'x-form-search-trigger',
    
    onTriggerClick : function() {
		this.setRawValue('');
		this.fireEvent('clear', this);
    }
});