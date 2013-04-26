sapp.require('sapphire/widgets/sapp.ui.Dialog');

sapp.ui.MessageBox = sapp.Class(function(parent, options) {
    sapp.ui.Dialog.prototype.constructor.call(this, parent, options);
    
    this.width('300px');
    
    this._icon = new sapp.ui.Component('<img align="left" width="64" />');
    this._message = new sapp.ui.Component('<p></p>');
    this._okButton = new sapp.ui.Component('<button>OK</button>');
    this._okButton.events.add('click', {receiver: this}, function(e) {
        e.data.receiver.close();
    });
    
    this._icon.addClass('message-box-icon');
    this._message.addClass('message-box-message');
    
    this.addComponents([this._icon, this._message, this._okButton]);
    this._okButton.wrap('<div class="message-box-button-wrapper"></div>');
    
}).inherits(sapp.ui.Dialog);

sapp.ui.MessageBox.prototype.setIcon = function(source) {
    this._icon.attr('src', source);
    return this;
};

sapp.ui.MessageBox.prototype.icon = function() {
    return this._icon;
};

sapp.ui.MessageBox.prototype.setMessage = function(message) {
    this._message.html(message);
    return this;
};

sapp.ui.MessageBox.prototype.message = function() {
    return this._message;
};

// Static methods

sapp.ui.MessageBox.error = function(parent, message) {
    var messageBox = new sapp.ui.MessageBox(parent, {resizable: false});
    messageBox.setIcon('theme/icons/128x128/error.png');
    messageBox.setMessage(message);
    
    messageBox.initialize();
    
    return messageBox;
};

sapp.ui.MessageBox.warning = function(parent, message) {
    var messageBox = new sapp.ui.MessageBox(parent, {resizable: false});
    messageBox.setIcon('theme/icons/128x128/warning.png');
    messageBox.setMessage(message);
    
    messageBox.initialize();
    
    return messageBox;
};

sapp.ui.MessageBox.notice = function(parent, message) {
    var messageBox = new sapp.ui.MessageBox(parent, {resizable: false});
    messageBox.setIcon('theme/icons/128x128/info.png');
    messageBox.setMessage(message);
    
    messageBox.initialize();
    
    return messageBox;
};
