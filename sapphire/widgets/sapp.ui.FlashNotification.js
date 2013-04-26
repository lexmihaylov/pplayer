sapp.require('sapphire/system/sapp.ui.Component');

sapp.ui.FlashNotification = sapp.Class(function(message) {
    sapp.ui.Component.prototype.constructor.call(this);
    this.html(message);
    this.css({
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        zIndex: '9999',
        padding: '5px 10px'
    });
    
    this.addClass('flash-notification');
}).inherits(sapp.ui.Component);

sapp.ui.FlashNotification.prototype.view = function() {
    var $this = this;
    sapp.dom.body.addComponent($this);
    
    sapp.dom.window.get(0).setTimeout(function() {
        Saphre.body.removeComponent($this);
    }, 1500);
};

sapp.ui.FlashNotification.toast = function(message) {
    var n = new sapp.ui.FlashNotification(message);
    n.view();
};