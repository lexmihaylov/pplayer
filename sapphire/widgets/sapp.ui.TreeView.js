sapp.require('sapphire/widgets/sapp.ui.TreeViewItem');
sapp.require('sapphire/widgets/sapp.ui.TreeViewNode');

// sapp.ui.TreeView Class
sapp.ui.TreeView = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this);
    
    this.addClass('tree-view');
    this.rootNode = undefined;
    
}).inherits(sapp.ui.Component);
    
sapp.ui.TreeView.prototype.setRootNode = function(node) {
    this.rootNode = node;
    this.addComponent(this.rootNode);
        
    return this;
};

sapp.ui.TreeView.prototype.addItem = function(item) {
    if(!this.rootNode) {
        this.setRootNode(new sapp.ui.TreeViewNode());
    }
    
    this.rootNode.addItem(item);
    
    return this;
};