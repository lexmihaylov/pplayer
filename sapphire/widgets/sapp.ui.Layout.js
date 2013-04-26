sapp.require('sapphire/widgets/sapp.ui.Pane');
// sapp.ui.Layout Class
sapp.ui.Layout = sapp.Class(function(parentWidget, options) {
    sapp.ui.Component.prototype.constructor.call(this);
    this.setParent(parentWidget);
    this.addClass('layout');
    
    if(options == null) {
        options = {};
    }
    this.options = {
        resizable: false,
        helper: false
    };
    
    this.options = $.extend(this.options, options);
    
}).inherits(sapp.ui.Component);

sapp.ui.Layout.prototype.initialize = function() {
    this.getParent().addComponent(this);
    this.layout(function() {
        this.fillBoth();
    });
    
    this.setupPanes();
    
    if(this.options.resizable) {
        this.userResizable();
    }
};

sapp.ui.Layout.prototype.userResizable = function() {
    var panes = this.getComponents();
    if(panes) {
        for(var i = 0; i < panes.length - 1; i++) {
            this.initResizablePanes(panes[i], panes[i+1]);
        }
    }
};