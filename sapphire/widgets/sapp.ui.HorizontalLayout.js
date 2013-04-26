sapp.require('sapphire/widgets/sapp.ui.Layout');
// sapp.ui.HorizontalLayout Class
sapp.ui.HorizontalLayout = sapp.Class(function(parentWidget, options) {
    sapp.ui.Layout.prototype.constructor.call(this, parentWidget, options);
}).inherits(sapp.ui.Layout);

sapp.ui.HorizontalLayout.prototype.initResizablePanes = function (pane, relativePane) {
    var resizableOptions = {
        handles: "s"
    };
    
    if(this.options.helper) {
        resizableOptions.helper = 'horizontal-resize-helper';
    }
    
    pane.resizable(resizableOptions);
            
    var initialHeight = null;
            
    pane.events.add('resizestart', {sender: this}, function(e) {
        initialHeight = pane.height();
        
        e.data.sender.calculateResizeConstrains(pane, relativePane);
    });

    pane.events.add('resize', function() {
        var resizedHeight = initialHeight - pane.height();
        var newHeight = relativePane.height() + resizedHeight;
        relativePane.height(newHeight);

        initialHeight = pane.height();
    });
    
    pane.events.add('resizestop', {sender: this}, function(e) {
        if(e.data.sender.options.helper) {
            pane.trigger('resize');
        }
        
        var panePercentageHeight = 100*pane.height()/e.data.sender.height();
        var relativePanePercentageHeight = 100*relativePane.height()/e.data.sender.height();
        
        pane.height(panePercentageHeight+'%');
        pane.width('100%');
        relativePane.height(relativePanePercentageHeight+'%');
        relativePane.width('100%');
    });
};

sapp.ui.HorizontalLayout.prototype.calculateResizeConstrains = function(pane, relativePane) {
    var defaultValue = pane.height() + relativePane.outerHeight() - relativePane.minHeight(),
        maxHeight = pane.maxHeight();
    
    if(!maxHeight) {
        maxHeight  = defaultValue;
    } else {
        if(maxHeight > defaultValue) {
            maxHeight = maxHeight - (maxHeight - defaultValue);
        }
    }
    
    pane.resizable('option', 'maxHeight', maxHeight);
    
    if(pane.minHeight() > maxHeight) {
        pane.resizable('option', 'minHeight', maxHeight);
    } else {
        pane.resizable('option', 'minHeight', pane.minHeight());
    }
    
    return this;
};

sapp.ui.HorizontalLayout.prototype.setupPanes = function() {
    var panes = this.getComponents();    
    
    if(panes) {
        var fittingArea = this.height();
        var notSized = [];
        
        for(var i in panes) {
            
            var paneHeight = panes[i].height();
            
            if(paneHeight > 0) {
                fittingArea -= paneHeight;
                
                paneHeight = 100 *  paneHeight / this.height();
                
                panes[i].height(paneHeight+'%');
            } else {
                notSized.push(panes[i]);
            }
            
            panes[i].width('100%');
            panes[i].initialize();
        }
        
        if(notSized.length > 0) {
            var defaultPaneHeight = fittingArea/notSized.length;

            for(i in notSized) {
                paneHeight = 100 * defaultPaneHeight / this.height();
                notSized[i].height( paneHeight +'%' );
            }
        } else {
            var lastPane = panes[panes.length - 1];
            paneHeight = 100 * (fittingArea + lastPane.height()) / this.height();
            lastPane.height(paneHeight + '%');
        }
    }
};