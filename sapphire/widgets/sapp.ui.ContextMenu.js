sapp.require('sapphire/widgets/sapp.ui.Menu');

sapp.ui.ContextMenu = sapp.Class(function() {
    sapp.ui.Menu.prototype.constructor.call(this);
}).inherits(sapp.ui.Menu);

sapp.ui.ContextMenu.prototype.initialize = function(x, y) {
    this.initBehaviour();
    
    this.css({
            'left': x,
            'top': y
        });
        
    sapp.dom.body.addComponent(this);
        
    this.show();
        
    if((x + this.outerWidth()) > sapp.dom.window.width()) {
        this.css('left', x - this.width());
    }
        
    if((y + this.outerHeight()) > sapp.dom.window.height()) {
        this.css('top', y - this.height());
    }
        
    return this
};
    
sapp.ui.ContextMenu.prototype.initBehaviour = function() {
    sapp.dom.document.trigger('click');
    
    this.events.add(sapp.dom.document, 'click', function(){
        sapp.dom.body.removeComponent(this);
    });
};
