Ext.define('MyApp.view.override.MarkdownArea', {
    override: 'MyApp.view.MarkdownArea',
    
    editorId: null,
    editor: null,
    
    initComponent: function(){
        var me = this;
        me.editorId = Ext.id();

        Ext.apply(me, {
            width: 640,
            height: 300,
            listeners: {
    			resize: {
        			fn: me.onTextareafieldResize,
            		scope: me
    			}
    		},
            fieldSubTpl: [
                '<div id="{id}" {inputAttrTpl}>',
                '<div id="' + me.editorId + '" class="amun-ace-editor" style="width:100%;height:100%;"></div>',
                '</div>',
                {
                    disableFormats: true
                }
            ]
        });


        me.callParent();
    },

    afterRender: function(){
        var me = this;

        me.callParent(arguments);
        // ace editor
        me.editor = ace.edit(me.editorId);
        me.editor.setTheme('ace/theme/twilight');
        me.editor.getSession().setMode('ace/mode/markdown');
        me.editor.setShowInvisibles(true);
        me.editor.setDisplayIndentGuides(true);
        me.editor.setPrintMarginColumn(false);
        me.editor.renderer.setHScrollBarAlwaysVisible(false);
        //document.getElementById(me.editorId).requestFullScreen()
        //.editor.setReadOnly(checked);
        
        me.editor.setValue(me.rawValue, -1);
    },

    setRawValue: function(value){
        var me = this;
        me.rawValue = value;
        
        if(me.editor){
            me.editor.setValue(value, -1);
        }
        return value;
    },

    getRawValue: function(){
        var me = this;
        var value = me.editor != null ? me.editor.getValue() : '';
        return value;
    },
    
    onTextareafieldResize: function(component, width, height, oldWidth, oldHeight, eOpts){
        var me = this;
        me.editor.resize();
	}
    
});