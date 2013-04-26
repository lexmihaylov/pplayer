sapp.require('sapphire/system/sapp.ui.Component');
// sapp.ui.TableViewColumn Class
sapp.ui.TableViewColumn = sapp.Class(function(label) {
    sapp.ui.Component.prototype.constructor.call(this, '<td></td>');
    this.label(label);
}).inherits(sapp.ui.Component);