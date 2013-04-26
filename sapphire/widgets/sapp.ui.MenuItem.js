sapp.require('sapphire/system/sapp.ui.Component');
// sapp.ui.MenuItem Class
sapp.ui.MenuItem = sapp.Class(function (label) {
    sapp.ui.Component.prototype.constructor.call(this, '<li></li>');
    
    this.label(label);
    
    this.initBehaviour();
    
}).inherits(sapp.ui.Component);

sapp.ui.MenuItem.prototype.initMenuBehaviour = function() {
    var $this = this;
    
    this.css('position','relative');//relative for aligning the sub menu
                
    $this.mouseenter(function() {
        $this.menu.css({
            left: $this.outerWidth(),
            top: 0
        });
           
        $this.menu.show();
    });
        
    $this.mouseleave(function() {
        $this.menu.hide();
    });
};
    
sapp.ui.MenuItem.prototype.initBehaviour = function() {
    var $this = this;
    $this.hover(
        function() {
            $this.addClass('hovered');
        },
        function() {
            $this.removeClass('hovered');
        }
    );
};
    
    
sapp.ui.MenuItem.prototype.setMenu = function(subMenu) {
    this.menu = subMenu;
    this.addComponent(this.menu);
        
    this.initMenuBehaviour();
        
    return this;
};

sapp.ui.MenuItem.prototype.addItem = function (item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItem(item);
    
    return this;
};

sapp.ui.MenuItem.prototype.addItemBefore = function (beforeItem, item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItemBefore(beforeItem, item)
    
    return this;
};

sapp.ui.MenuItem.prototype.addItemAfter = function (afterItem, item) {
    if(!this.menu) {
        this.setMenu(new sapp.ui.Menu);
    }
    
    this.menu.addItemAfter(afterItem, item);
    
    return this;
};
    
sapp.ui.MenuItem.prototype.setIcon = function(path) {
    this.css({
        listStyleImage: 'url(' + path + ')'
    });
};