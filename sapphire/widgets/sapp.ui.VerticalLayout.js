sapp.require('sapphire/widgets/sapp.ui.Layout');
// sapp.ui.VerticalLayout Class
sapp.ui.VerticalLayout = sapp.Class(function(parentWidget, options) {
    sapp.ui.Layout.prototype.constructor.call(this, parentWidget, options)
}).inherits(sapp.ui.Layout);

sapp.ui.VerticalLayout.prototype.initResizablePanes = function (pane, relativePane) {
    var resizableOptions = {
        handles: "e"
    };
    
    if(this.options.helper) {
        resizableOptions.helper = 'vertical-resize-helper';
    }
    
    pane.resizable(resizableOptions);
            
    var initialWidth = null;
    
    pane.events.add('resizestart', {sender: this}, function(e) {
        initialWidth = pane.width();
        
        e.data.sender.calculateResizeConstrains(pane, relativePane);
    });

    pane.events.add('resize', {sender: this}, function() {
        var resizedWidth = initialWidth - pane.width();
        var newWidth = relativePane.width() + resizedWidth;
        relativePane.width(newWidth);

        initialWidth = pane.width();
    });
    
    pane.events.add('resizestop', {sender: this}, function(e) {
        if(e.data.sender.options.helper) {
            pane.trigger('resize');
        }
        
        var panePercentageWidth = 100*pane.width()/e.data.sender.width();
        var relativePanePercentageWidth = 100*relativePane.width()/e.data.sender.width();
        
        pane.width(panePercentageWidth+'%');
        pane.height('100%');
        relativePane.width(relativePanePercentageWidth+'%');
        relativePane.height('100%');
    });
};

sapp.ui.VerticalLayout.prototype.calculateResizeConstrains = function(pane, relativePane) {
    var defaultValue = pane.width() + relativePane.outerWidth() - relativePane.minWidth(),
        maxWidth = pane.maxWidth();
    
    if(!maxWidth) {
        maxWidth  = defaultValue;
    } else {
        if(maxWidth > defaultValue) {
            maxWidth = maxWidth - (maxWidth - defaultValue);
        }
    }
    
    pane.resizable('option', 'maxWidth', maxWidth);
    
    if(pane.minWidth() > maxWidth) {
        pane.resizable('option', 'minWidth', maxWidth);
    } else {
        pane.resizable('option', 'minWidth', pane.minWidth());
    }
    
    return this;
};

sapp.ui.VerticalLayout.prototype.setupPanes = function() {
    var panes = this.getComponents();    
    
    if(panes) {
        var fittingArea = this.width();
        var notSized = [];
        for(var i in panes) {
            
            var paneWidth = panes[i].width();
            
            if(paneWidth > 0) {
                fittingArea -= paneWidth;
                
                paneWidth = 100 *  paneWidth / this.width();
                
                panes[i].width(paneWidth+'%');
            } else {
                notSized.push(panes[i]);
            }
            
            panes[i].height('100%');
            panes[i].initialize();
        }
        
        if(notSized.length > 0) {
            var defaultPaneWidth = fittingArea/notSized.length;

            for(i in notSized) {
                paneWidth = 100 * defaultPaneWidth / this.width();
                notSized[i].width( paneWidth +'%' );
            }
        } else {
            var lastPane = panes[panes.length - 1];
            paneWidth = 100 * (fittingArea + lastPane.width()) / this.width();
            lastPane.width(paneWidth + '%');
        }
    }
};