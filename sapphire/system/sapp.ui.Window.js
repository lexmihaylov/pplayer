// sapp.ui.Window Class
sapp.ui.Window = function(Url, name) {
    this.url = Url;
    this.windowName = name;
    this.options = {};
    this.loadDefaultOptions();
};

sapp.ui.Window.prototype.loadDefaultOptions = function() {
    this.options = {
        'location': 'no',
        'directories': 'no',
        'menubar': 'no',
        'width': '800',
        'height': '480',
        'status': 'no',
        'toolbar': 'no'
    }
};

sapp.ui.Window.prototype.setOption = function(attribute, value) {
    this.options[attribute] = value;
};

sapp.ui.Window.prototype.setWindowName = function(name) {
    this.windowName = name;
};

sapp.ui.Window.prototype.setUrl = function(Url) {
    this.url = Url;
};

sapp.ui.Window.prototype._joinOptions = function() {
    var options = '';
    for(var i in this.options) {
        options += i + '=' +this.options[i] + ',';
    }
    
    return options.replace(/,+$/,'');
};

sapp.ui.Window.prototype.show = function() {
    if(!this.options.left) {
        this.options.left = screen.width/2 - this.options.width/2;
    }
    
    if(!this.options.top) {
        this.options.top = screen.height/2 - this.options.height/2;
    }
    
    var popupWindow = $(sapp.dom.window.get(0).open(this.url, this.windowName, this._joinOptions()));
    
    return popupWindow;
};