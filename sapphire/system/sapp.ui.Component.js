sapp.require('sapphire/system/jquery.core');
sapp.require('sapphire/system/jquery.ui');

sapp.require('sapphire/system/sapp.dom');
sapp.require('sapphire/system/sapp.Http');

sapp.ui = {};

// sapp.ui.Component sapp.Class
sapp.ui.Component = sapp.Class(function (object) {
    sapp.dom.Object.call(this, object);
    
    if(this.template) {
        this.initTemplate();
    }
    
}).inherits(sapp.dom.Object);

sapp.ui.Component.prototype.template = null;

sapp.ui.Component.prototype.initTemplate = function() {
    this.html(this.template);
};

sapp.ui.Component.prototype.fillVertical = function(includeMargins) {
    if(includeMargins == null) {
        includeMargins = true;
    }
    var parent = this.getParent();
    var parentHeight = parent.height();
    var paddingAndBorders = this.outerHeight(includeMargins) - this.height();
        
    this.height(parentHeight - paddingAndBorders);
        
    return this;
};
    
sapp.ui.Component.prototype.fillHorizontal = function(includeMargins) {
    if(includeMargins == null) {
        includeMargins = true;
    }
        
    var parent = this.getParent();
    var parentWidth = parent.width();
    var paddingAndBorders = this.outerWidth(includeMargins) - this.width();
        
    this.width(parentWidth - paddingAndBorders);
        
    return this;
};
    
sapp.ui.Component.prototype.fillBoth = function() {
    this.fillHorizontal().
    fillVertical();
    
    return this;
};
    
sapp.ui.Component.prototype.centerVertical = function() {
    this.css('top', '50%');
    this.css('margin-top', -(this.outerHeight()/2));
        
    if((this.position().top - (this.outerHeight()/2)) < 0) {
        this.css('top', 0);
        this.css('margin-top', 0);
    }
        
    return this;
};
    
sapp.ui.Component.prototype.centerHotizontal = function() {
    this.css('left', '50%');
    this.css('margin-left', -(this.outerWidth()/2));
        
    if((this.position().left - (this.outerWidth()/2)) < 0) {
        this.css('left', 0);
        this.css('margin-left', 0);
    }
        
    return this;
};
    
sapp.ui.Component.prototype.centerBoth = function() {
    this.centerHotizontal().
    centerVertical();
            
    return this;
};

sapp.ui.Component.prototype.label = function(text) {
    if(text != null) {
        var label = this.children('label:first');
        if(label.length > 0) {
            label.text(text);
        } else {
            this.append('<label>' + text + '</label>');
        }
            
        return this;
    } else {
        return this.children('label:first').text();
    }
};

sapp.ui.Component.setTemplate = function(currentClass, path) {
    if(path == null){
        console.log('Error: Please enter a path for the template.');
        return false;
    }
    
    var template = sapp.Http.load(path);
    
    currentClass.prototype.template = template;
    
    return template;
};

sapp.ui.Component.prototype.layout = function(handler) {
    handler.call(this, {});
    
    this.events.add(sapp.dom.window, 'resize', handler);
};