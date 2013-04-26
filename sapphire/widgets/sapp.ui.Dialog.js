sapp.require('sapphire/system/sapp.ui.Component');

sapp.ui.Dialog = sapp.Class(function(owner, options) {    
    if(!owner) {
        owner = sapp.dom.body;
    }
    
    if(!options) {
        options = {};
    }
    
    this._options = {
        resizable: true,
        draggable: true
    };
    
    this._options = $.extend(this._options, options);
    
    this.setParent(owner);
    
    this._titleBar = new sapp.ui.Component().addClass('dialog-box-title-bar');
    this._closeButton = new sapp.ui.Component().addClass('dialog-box-close');
    this._title = new sapp.ui.Component().addClass('dialog-box-title');
    this._content = new sapp.ui.Component().addClass('dialog-box-content');
    
    sapp.ui.Component.prototype.constructor.call(this);
    
    this.addClass('dialog-box');
    
    this._titleBar.addComponents([this._title, this._closeButton]);
        
    this.addComponents([this._titleBar, this._content]);
    
    this._closeButton.events.add('click', {receiver: this}, function(e) {
        e.data.receiver.close();
    });
    
    this.getParent().addComponent(this);
    
    if(this._options.resizable) {
        this._content.resizable();
    }
    
    if(this._options.draggable) {
        this.draggable({
            containment: this.getParent(),
            handle: this._titleBar
        });
    }
    
    this.hide();
    
    this._overrideMethods();
    
}).inherits(sapp.ui.Component);

sapp.ui.Dialog.prototype.initTemplate = function() {
    this._content.template = this.template;
    this._content.initTemplate();
    this.view = this._content.view;
    
    return this;
};

sapp.ui.Dialog.prototype.initialize = function() {
    this.show();
    this.centerBoth();
    
    this.trigger('dialogOpen', this);
    
    return this;
};

sapp.ui.Dialog.prototype._overrideMethods = function() {
    this.width = function(value) {
        return this._content.width(value);
    };
    
    this.height = function(value) {
        return this._content.height(value);
    };
    
    this.addComponent = function(widget) {
        return this._content.addComponent(widget);
    };
    
    this.addComponents = function(itemsArray) {
        return this._content.addComponents(itemsArray);
    };
    
    this.removeComponent = function(widget) {
        return this._content.removeComponent(widget);
    };
    
    return this;
};
    
sapp.ui.Dialog.prototype.title = function(val) {
    if(!val) {
        return this._title.text();
    } else {
        this._title.text(val);
        return null;
    }
    
    return this;
};
    
sapp.ui.Dialog.prototype.close = function() {
    this.getParent().removeComponent(this);
    this.trigger('dialogClose', this);
    
    return this;
};