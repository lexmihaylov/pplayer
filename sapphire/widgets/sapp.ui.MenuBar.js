sapp.require('sapphire/widgets/sapp.ui.Menu');
sapp.require('sapphire/widgets/sapp.ui.MainMenu');

// sapp.ui.MenuBar sapp.Class
sapp.ui.MenuBar = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this);
    this.mainMenu = null;
        
    this.addClass('menu-bar');
    
}).inherits(sapp.ui.Component);

sapp.ui.MenuBar.prototype.setMainMenu = function(menu) {
    this.mainMenu = menu;
    this.addComponent(this.mainMenu);
};

sapp.ui.MenuBar.prototype.addItem = function(item) {
    if(!this.mainMenu) {
        this.setMainMenu(new sapp.ui.MainMenu());
    }
    this.mainMenu.addItem(item);
};

sapp.ui.MenuBar.prototype.addItemBefore = function (beforeItem, item) {
    if(!this.mainMenu) {
        this.setMainMenu(new sapp.ui.MainMenu());
    }
    
    this.mainMenu.addItemBefore(beforeItem, item)
    
    return this;
};

sapp.ui.MenuBar.prototype.addItemAfter = function (afterItem, item) {
    if(!this.mainMenu) {
        this.setMainMenu(new sapp.ui.MainMenu());
    }
    
    this.mainMenu.addItemAfter(afterItem, item);
    
    return this;
};

