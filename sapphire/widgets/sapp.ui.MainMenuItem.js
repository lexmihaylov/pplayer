// sapp.ui.MainMenuItem Class
sapp.ui.MainMenuItem = sapp.Class(function(label) {
    sapp.ui.Component.prototype.constructor.call(this, '<li></li>');
    
    this.label(label);
    
    this.initBehaviour();
    
    sapp.ui.MainMenuItem.isActive = false;

    
}).inherits(sapp.ui.Component);

sapp.ui.MainMenuItem.prototype.initMenuBehaviour = function() {    
    this.events.add(sapp.dom.document, 'click', function() {
        this.hideMenu();
    });
    
    this.events.add(sapp.dom.document, 'keyup', function(e) {
        if (e.keyCode == 27) {
            this.hideMenu();
        }
    });
        
    this.events.add('click', function(e) {
        if(this.menu.is(':hidden')) {
            e.stopPropagation();
            sapp.dom.document.trigger('click');
            this.showMenu();
        }
    });
        
    this.events.add('mouseenter', $.proxy(function() {
        if(sapp.ui.MainMenuItem.isActive) {
            sapp.dom.document.click();
            this.showMenu();
        }
    }, this));
};
    
sapp.ui.MainMenuItem.prototype.hideMenu = function() {
    this.menu.hide();
    this.removeClass('activated');
        
    sapp.ui.MainMenuItem.isActive = false
};
    
sapp.ui.MainMenuItem.prototype.showMenu = function() {
    this.menu.css({
        top: this.offset().top + this.outerHeight(),
        left: this.offset().left
    });
        
    this.menu.show();
        
    this.addClass('activated');
        
    sapp.ui.MainMenuItem.isActive = true;
};
    
sapp.ui.MainMenuItem.prototype.initBehaviour = function() {
    this.hover(
        $.proxy(function() {
            this.addClass('hovered');
        }, this),
        $.proxy(function() {
            this.removeClass('hovered');
        }, this)
    );
};
    
sapp.ui.MainMenuItem.prototype.setMenu = function(subMenu) {
    this.menu = subMenu;
    this.addComponent(this.menu);
        
    this.initMenuBehaviour();
        
    return this;
};

sapp.ui.MainMenuItem.prototype.addItem = function (item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItem(item);
    
    return this;
};

sapp.ui.MainMenuItem.prototype.addItemBefore = function (beforeItem, item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItemBefore(beforeItem, item)
    
    return this;
};

sapp.ui.MainMenuItem.prototype.addItemAfter = function (afterItem, item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItemAfter(afterItem, item);
    
    return this;
};