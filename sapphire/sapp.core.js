var sapp = {};

sapp.dependencies = [];

sapp.require = function(filename) {
    var xhr = null;
    var extencionRexExp = /\.js$/;
    
    if(!extencionRexExp.test(filename)) {
        filename += '.js';
    }
    
    if (window.XMLHttpRequest) {              
        xhr = new XMLHttpRequest();              
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if (xhr) {
        if(sapp.dependencies.indexOf(filename) == -1) {
            xhr.open("GET", filename, false);                             
            xhr.send(null);
            
            if(xhr.status == 200) {
                sapp.dependencies.push(filename);
                return window.eval(xhr.responseText);
            }
        }
    }
    
    return null;
};

/**
 * sapp.Class helper
 * Adds additional functionality to a class
 * @param {object} currentClass The class constructor
 * @class
 */
sapp.Class = function(currentClass) {
    // load class helper functions    
    sapp.Class._addClassHelperMethods(currentClass);
    // return the new class
    return currentClass;
};
    
/**
 * <p>Creates a new class and inherits a parent class</p>
 * <p><b>Note: when calling a super function use: [ParentClass].prototype.[method].call(this, arguments)</b></p>
 * @param {object} childClass the class that will inherit the parent class
 * @param {object} parentClass the class that this class will inherit
 */
sapp.Class._inherits = function(childClass, parentClass) {
    // create a temporary class to hold the prototype of the parentClass
    var stdClass = function() {};
    stdClass.prototype = parentClass.prototype;
    // inherit parent's methods
    sapp.Class._extendPrototypeOf(childClass, new stdClass());
    // set the constructor
    childClass.prototype.constructor = childClass;
    // return the new class
    return childClass;
};

/**
 * Copies methods form an object to the class prototype
 * @param {object} inheritingClass the class that will inherit the methods
 * @param {object} methodsObject the object that contains the methods
 */
sapp.Class._extendPrototypeOf = function(inheritingClass, methodsObject) {
    for(var i in methodsObject) {
        inheritingClass.prototype[i] = methodsObject[i];
    }
    
    return inheritingClass;
};
    
/**
 * Adds helper methods to ease the use of Classes
 * @param {object} currentClass The Class to add helpers to
 */
sapp.Class._addClassHelperMethods = function(currentClass) {
    var $this = sapp.Class;
        
    /**
     * Inherits properties of a parent class
     * @param {object} parentClass The inherited class
     * @return {object} the childClass
     */
    currentClass.inherits = function(parentClass) {
        return $this._inherits(currentClass, parentClass);
    };
        
    /**
     * Converts an object to an instance of the current class
     * @param {Object} Object the object to cast
     * @return {Object} Object of the current class
     */
    currentClass.cast = function(Object) {
        // Overrite object methods with current class' methods
        var element = null;
        if(Object.get != undefined) {
            element = Object.get(0);
        } else {
            element = Object;
        }
        
        var bufferObject = new currentClass();
        bufferObject.init(element);
        
        currentClass.prototype.constructor.call(bufferObject);
        
        return bufferObject;
    };
};


/**
 * @namespace
 * Holds functions that help you managa cookies
 */
sapp.cookie = {};

/**
 * Create a cookie on the clients browser
 * @param {String} name
 * @param {String} value
 * @param {Object} opt
 * @param {int} opt.expires Expiration time in seconds
 * @param {path} opt.path Default value is /
 * @param {domain} opt.domain If domain is not set then the current domain
 * will be set to cookie
 */
sapp.cookie.set = function(name, value, opt) {
    value = escape(value);
    if(!opt) opt = {};
    
    if(opt.expires) {
        var date = new Date();
        date.setTime(date.getTime() + parseInt(opt.expires*1000));
        value = value + ';expires=' + date.toGMTString();
    }
    
    if(opt.path) {
        value = value + ';path=' + opt.path;
    } else {
        value = value + ';path=/';
    }
    
    if(opt.domain) {
        value = value + ';domain=' + opt.domain;
    }
    
    document.cookie = name + "=" + value + ";";
};

/**
 * Retrieve a cookie's value
 * @param {string} name
 */
sapp.cookie.get = function(name) {
    var expr = new RegExp(name+'=(.*?)(;|$)','g');
    var matches = expr.exec(document.cookie);
    if(!matches || !matches[1]) {
        return null;
    }
    return matches[1];
};

/**
 * Deletes cookie
 * @param {string} name
 */
sapp.cookie.destroy = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};