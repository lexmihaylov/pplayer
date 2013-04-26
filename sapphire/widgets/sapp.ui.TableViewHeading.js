sapp.require('sapphire/system/sapp.ui.Component');
// TableViewHeding Class
sapp.ui.TableViewHeading = sapp.Class(function(label) {
    sapp.ui.Component.prototype.constructor.call(this, '<th></th>');
    this.label(label);
    
    this.resizable({
        handles: 'e'
    });
    
}).inherits(sapp.ui.Component);