sapp.dom.Event = sapp.Class(function(widget) {
    this._events = [];
    this._widget = widget;
});

sapp.dom.Event.prototype.add = function(target, type, selector, data, handler) {
    // normalize method input
    if(typeof(target) == 'string') {
        handler = data;
        data = selector;
        selector = type;
        
        type = target;
        target = this._widget;
    }
    
    if(typeof(selector) == 'object') {
        handler = data;
        data = selector;
        selector = undefined;
        
    } else if(typeof(selector) == 'function') {
        handler = selector;
        data = selector = undefined;
    }
    
    if(typeof(data) == 'function') {
        handler = data;
        data = undefined;
    }
    
    // create a unique function
    if(handler.guid) {
        handler.guid = undefined;
    }
    
    handler = $.proxy(handler, this._widget);
    
    var eventObject = {
        type: type,
        target: target,
        handler: handler,
        selector: selector
    }
    
    this._events.push(eventObject);
    
    target.on(type, selector, data, handler);
    
    return eventObject;
};

sapp.dom.Event.prototype.remove = function(eventObject) {
    var index = this._events.indexOf(eventObject);
    var event = this._events[index];
    
    event.target.off(event.type, event.selector, event.handler);
    
    return this;
};

sapp.dom.Event.prototype.removeAll = function() {
    for(var i = 0; i < this._events.length; i++)
        this.remove(this._events[i]);
    
    return this;
};