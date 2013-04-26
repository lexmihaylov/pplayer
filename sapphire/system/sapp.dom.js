sapp.dom = {};

sapp.require('sapphire/system/jquery.core');
sapp.require('sapphire/system/sapp.dom.Event');
sapp.require('sapphire/system/sapp.dom.Object');

sapp.dom.window = new sapp.dom.Object(window);
sapp.dom.document = new sapp.dom.Object(document);
sapp.dom.body = null;

sapp.dom.ready = function (fn) {
    sapp.dom.document.on('ready', function() {
        sapp.dom.body = new sapp.dom.Object(document.getElementsByTagName('body'));
    });
    
    sapp.dom.window.on('load', function(e) {
        if(typeof(fn) == 'function') {
            fn(e);
        }
    });
};

sapp.dom.exists = function(object) {
    if(sapp.dom.document.find(object).length) {
        return true;
    }
    
    return false;
};

sapp.dom.get = function(selector, context) {
    var objects = jQuery(selector, context);
    if(objects) {
        var components = [];
        objects.each(function() {
            var $this = $(this);
            var component = $this.sapp().instance();
            if(component) {
                components.push(component);
            } else {
                components.push(new sapp.dom.Object($this));
            }
        });
    }
    
    return components;
};

sapp.dom.render = function(object, context) {
    if(!context) {
        context = sapp.dom.body;
    }
    
    context.append(object);
};