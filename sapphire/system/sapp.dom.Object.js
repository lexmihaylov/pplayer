// jQuery interface method for accessing the sapp.dom.Object object from the dom
jQuery.prototype.sapp = function() {
    var $this = $(this);
    return {
        instance: function(component) {
            if(component) {
                $this.data('__SapphireObject__', component);
                return component;
            }

            return $this.data('__SapphireObject__');
        },
        destroy: function() {
            $this.removeData('__SapphireObject__');
        }
    };
};

// sapp.dom.Object sapp.Class
sapp.dom.Object = sapp.Class(function (object) {
    // extending an jQuert html dom object
    // no support for ie <= 8
    if(!object) {
        object = document.createElement('DIV');
    }
    
    if(!this.get(0)) {
        this.init(object);
        this.constructor = jQuery;
    }
    
    this._components = [];
    
    this.events = new sapp.dom.Event(this);
    
    // set an object reference in the dom
    this.sapp().instance(this);
    
}).inherits(jQuery);

sapp.dom.Object.prototype.getParent = function(expr) {
    if(this._parentObject && !expr) {
        return this._parentObject;
    }
    
    var domParent = this.parent(expr);
    var parent = domParent.sapp().instance();
    
    if(parent) {
        return parent;
    }
    
    return new sapp.dom.Object(domParent);
};

sapp.dom.Object.prototype.getElements = function(selector) {
    return sapp.dom.get(selector, this);
};

sapp.dom.Object.prototype.getChildren = function(selector) {
    var objects = this.children(selector);
    var components = [];
    if(objects) {
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

sapp.dom.Object.prototype.setParent = function(parentObject) {
    this._parentObject = parentObject;
    
    return this;
}

sapp.dom.Object.prototype.remove = function() {
    this.events.removeAll();
    
    this.trigger('remove');
    
    return jQuery.prototype.remove.call(this);
};

sapp.dom.Object.prototype.addComponent = function(object) {
    if(!this._components) {
        this._components = [];
    }
    
    this._components.push(object);
    this.append(object);
    
    return this;
};

sapp.dom.Object.prototype.addComponents = function(itemArray) {
    if(!this._components) {
        this._components = [];
    }
    
    this._components = $.merge(this._components, itemArray);
    
    var itemBuffer = [];
    for(var i in itemArray) {
        itemBuffer[i] = itemArray[i].get(0);
    }
    
    this.append(itemBuffer);
    
    return this;
};

sapp.dom.Object.prototype.addComponentBefore = function(beforeComponent, component) {
    var newComponent = component;
    
    var currentIndex = this._components.indexOf(beforeComponent);
        
    this._components.splice(currentIndex, 0, newComponent);
    
    beforeComponent.before(newComponent);
};

sapp.dom.Object.prototype.addComponentAfter = function(afterComponent, component) {
    var newComponent = component;
    var currentIndex = this._components.indexOf(afterComponent);
        
    this._components.splice(currentIndex + 1, 0, newComponent);
    
    afterComponent.after(newComponent);
};

sapp.dom.Object.prototype.getComponents = function() {
    return this._components;
};

sapp.dom.Object.prototype.clearComponents = function() {
    for(var i = 0; i < this._components.length; i++) {
        this._components[i].remove();
        delete this._components[i];
    }
    
    return this;
};

sapp.dom.Object.prototype.removeComponent = function (object) {
    var index = this.getComponents().indexOf(object);
    if(index >= 0) {
        delete this._components[index];
        object.remove();
    }
    
    return this;
};
    
sapp.dom.Object.prototype.widthInPercent = function(val) {
    if(val == null) {
        var width = this.width();
        var parentWidth = this.offsetParent().width();
        return 100*width/parentWidth;
    } else {
        this.width(val + '%');
        return null;
    }
};
    
sapp.dom.Object.prototype.heightInPercent = function(val) {
    if(val == null) {
        var height = this.height();
        var parentHeight = this.offsetParent().height();
        return 100*height/parentHeight;
    } else {
        this.height(val + '%');
        return null;
    }
};

sapp.dom.Object.prototype.computedStyle = function(property) {
    return sapp.dom.window.get(0)
           .getComputedStyle(this.get(0)).getPropertyValue(property)
};

sapp.dom.Object.prototype.computedWidth = function() {
    return parseFloat(this.computedStyle('width'));
};

sapp.dom.Object.prototype.computedHeight = function() {
    return parseFloat(this.computedStyle('height'));
};

sapp.dom.Object.prototype.render = function(parentObject) {
    parentObject.addComponent(this);
};