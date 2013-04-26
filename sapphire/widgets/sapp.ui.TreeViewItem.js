sapp.require('sapphire/system/sapp.ui.Component');

// TreeViewItem Class
sapp.ui.TreeViewItem = sapp.Class(function(label) {
    sapp.ui.Component.prototype.constructor.call(this, '<li></li>');
    
    this.label(label);
    
    this.node = undefined;
    
    this._parentNode = null;
    
    this.initBehaviour();
    
    
    
}).inherits(sapp.ui.Component);
    
sapp.ui.TreeViewItem.prototype.initBehaviour = function() {
    this.events.add(sapp.dom.document, 'click', function() {
        this.deactivate();
    });
    
    this.events.add('click', function(e) {
        e.stopPropagation();
        sapp.dom.document.trigger('click');
        
        this.activate();
    });
        
    this.events.add('dblclick', function(e) {
        e.stopPropagation();
        if(this.node != undefined) {
            if(this.isColapsed()) {
                this.expand();
            } else {
                this.colapse();
            }
        }
        
        return false;
    });
};

sapp.ui.TreeViewItem.prototype.isColapsed = function() {
    return this.node.is(':hidden');
};

sapp.ui.TreeViewItem.prototype.colapse = function() {
    this.addClass('colapsed');
    this.node.hide();
};

sapp.ui.TreeViewItem.prototype.expand = function() {
    this.removeClass('colapsed');
    this.node.show();
};
    
sapp.ui.TreeViewItem.prototype.setNode = function(node) {
    this.node = node;
    this.addClass('node');
    this.addComponent(node);
        
    return this;
};
    
sapp.ui.TreeViewItem.prototype.deleteItem = function() {
    this.parentNode().removeComponent(this);
};
    
sapp.ui.TreeViewItem.prototype.parentNode = function(node) {
    if(node == null) {
        return this._parentNode;
    } else {
        this._parentNode = node;
        return null;
    }
};

sapp.ui.TreeViewItem.prototype.addItem = function(item) {
    if(!this.node) {
        this.setNode(new sapp.ui.TreeViewNode());
    }
    
    this.node.addItem(item);
};
    
sapp.ui.TreeViewItem.prototype.activate = function() {
    this.find('label:first').addClass('activated');
};
    
sapp.ui.TreeViewItem.prototype.deactivate = function() {
    this.find('label:first').removeClass('activated');
};