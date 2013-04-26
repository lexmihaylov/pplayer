sapp.require('sapphire/system/sapp.ui.Component');
sapp.ui.Separator = sapp.Class(function(type) {
    sapp.ui.Component.prototype.constructor.call(this,'<span></span>');
    
    if(type != 'vertical') {
        type = 'horizontal';
    }
    
    this.css({
        'display':'inline-block'
    });
    
    this.addClass(type + '-separator');
}).inherits(sapp.ui.Component);