sapp.require('sapphire/system/sapp.ui.Component');
// sapp.ui.TreeViewNode Class
sapp.ui.TreeViewNode = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this, '<ul></ul>');
}).inherits(sapp.ui.Component);
    
sapp.ui.TreeViewNode.prototype.addItem = function(item) {
    item.parentNode(this);
    this.addComponent(item);
        
    return this;
};
    
sapp.ui.TreeViewNode.prototype.addItemBefore = function(beforeItem, newItem) {        
    newItem.parentNode(this);
        
    this.addComponentBefore(beforeItem, newItem)
        
    return this;
};
    
sapp.ui.TreeViewNode.prototype.addNodeItemAfter = function(afterItem, newItem) {
    newItem.parentNode(this);
    
    this.addComponentAfter(afterItem, newItem);
        
    return this;
};