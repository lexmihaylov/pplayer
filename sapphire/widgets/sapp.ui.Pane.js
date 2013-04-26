sapp.require('sapphire/system/sapp.ui.Component');
// sapp.ui.Pane Class
sapp.ui.Pane = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this);
    
    this._minWidth = 50;
    this._minHeight = 50;
    this._maxWidth = false;
    this._maxHeight = false;
    
    this.initialize();
}).inherits(sapp.ui.Component);

sapp.ui.Pane.prototype.initialize = function() {
    this.addClass('grid');
    
    this.css({
        'float': 'left',
        'padding': 0,
        'margin': 0,
        'border': 'none'
    });
};

sapp.ui.Pane.prototype.width = function(value) {
    if(value) {
        sapp.ui.Component.prototype.width.call(this, value);
        return this;
    }
    
    return this.computedWidth();
};

sapp.ui.Pane.prototype.height = function(value) {
    if(value) {
        sapp.ui.Component.prototype.height.call(this, value);
        return this;
    }
    
    return this.computedHeight();
};

sapp.ui.Pane.prototype.minWidth = function(value) {
    if(value != null) {
        value = parseFloat(value);
        this._minWidth = value;
        
        return this;
    }
    
    return this._minWidth;
};

sapp.ui.Pane.prototype.minHeight = function(value) {
    if(value != null) {
        value = parseFloat(value);
        this._minHeight = value;
        
        return this;
    }
    
    return this._minHeight;
};

sapp.ui.Pane.prototype.maxWidth = function(value) {
    
    if(value != null) {
        value = parseFloat(value);
        this._maxWidth = value;
        return this;
    }
    
    return this._maxWidth;
};

sapp.ui.Pane.prototype.maxHeight = function(value) {
    if(value != null) {
        value = parseFloat(value);
        this._maxHeight = value;
        
        return this;
    }
    
    return this._maxHeight;
};