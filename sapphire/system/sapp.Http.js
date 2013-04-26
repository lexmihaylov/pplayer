sapp.Http = function(type, url) {
    this._settings = {
        type: type,
        url: url,
        async: false
    };
};

sapp.Http.prototype.exec = function() {
    jQuery.ajax(this._settings);
};

sapp.Http.prototype.setOptions = function(opt, val) {
    if(typeof opt == 'object') {
        this._settings = $.extend(this._settings, opt);
    } else {
        this._settings[opt] = val;
    }
    
    return this;
}

sapp.Http.prototype.options = function(opt) {
    if(!opt) {
        return this._settings;
    }
    
    return this._settings[opt];
};

sapp.Http.prototype.setType = function(type) {
    this._settings.type = type;
    
    return this;
};

sapp.Http.prototype.type = function() {
    return this._settings.type;
};

sapp.Http.prototype.setUrl = function(url) {
    this._settings.url = url;
    
    return this;
};

sapp.Http.prototype.url = function() {
    return this._settings.url;
};

sapp.Http.prototype.setData = function(data) {
    this._settings.data = data;
    
    return this;
};

sapp.Http.prototype.data = function() {
    return this._settings.data;
};

sapp.Http.prototype.setAsync = function(b) {
    this._settings.async = b;
    
    return this;
};

sapp.Http.prototype.async = function() {
    return this._settings.async;
};

sapp.Http.prototype.success = function(fn) {
    this._settings.success = fn;
    
    return this;
};

sapp.Http.prototype.setContext = function(context) {
    this._settings.context = context;
    
    return this;
};

sapp.Http.prototype.context = function() {
    return this._settings.context;
};

sapp.Http.prototype.setCache = function(opt) {
    this._settings.cache = opt;
    
    return this;
};

sapp.Http.prototype.cache = function() {
    return this._settings.cache;
};

sapp.Http.prototype.setAccepts = function(opt) {
    this._settings.accepts = opt;
    
    return this;
};

sapp.Http.prototype.accepts = function() {
    return this._settings.accepts;
};

sapp.Http.prototype.setStatusCode = function(code, callback) {
    this._settings.statusCode[code] = callback;
    
    return this;
};

sapp.Http.prototype.statusCode = function(code) {
    if(code) {
        return this._settings.statusCode[code];
    }
    
    return this._settings.statusCode;
};

sapp.Http.request = function(type, url, data, success, async) {
    var http = new sapp.Http(type, url);
    
    if(data) {
        http.setData(data);
    }
    
    if(success) {
        http.success(success);
    }
    
    if(typeof async == 'boolean') {
        http.setAsync(async);
    }
    
    http.exec();
    
    return this;
};

sapp.Http.get = function(url, success, async) {
    return sapp.Http.request('get', url, null, success, async);
};

sapp.Http.post = function(url, data, success, async) {
    return sapp.Http.request('get', url, data, success, async);
};

sapp.Http.load = function(url) {
    var response
    var success = function(data) {
        response = data;
    };
    
    sapp.Http.request('get', url, null, success, false);
    
    return response;
};




