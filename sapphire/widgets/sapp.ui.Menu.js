sapp.require('sapphire/widgets/sapp.ui.MenuItem');
// Menu Class
sapp.ui.Menu = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this, '<ul></ul>');
    
    this.addClass('drop-menu')
        .css({
            'display': 'none',
            'position': 'absolute',
            'z-index': '9999'
        });
}).inherits(sapp.ui.Component);
    
sapp.ui.Menu.prototype.addItem = function(item) {
    this.addComponent(item);
        
    return this;
};

sapp.ui.Menu.prototype.addItemBefore = function(beforeItem, item) {
    this.addComponentBefore(beforeItem, item);
    
    return this;
};

sapp.ui.Menu.prototype.addItemAfter = function(afterItem, item) {
    this.addComponentAfter(afterItem, item);
    
    return this;
};



