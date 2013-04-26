sapp.require('sapphire/widgets/sapp.ui.MainMenuItem');

// sapp.ui.MainMenu Class
sapp.ui.MainMenu = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this, '<ul></ul>');
    
    this.addClass('main-menu');
}).inherits(sapp.ui.Component);
    
sapp.ui.MainMenu.prototype.addItem = function(item) {
    this.addComponent(item);
        
    return this;
};

sapp.ui.MainMenu.prototype.addItemBefore = function(beforeItem, item) {
    this.addComponentBefore(beforeItem, item);
    
    return this;
};

sapp.ui.MainMenu.prototype.addItemAfter = function(afterItem, item) {
    this.addComponentAfter(afterItem, item);
    
    return this;
};