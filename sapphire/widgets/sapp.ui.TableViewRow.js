sapp.require('sapphire/system/sapp.ui.Component');
// sapp.ui.TableViewRow Class
sapp.ui.TableViewRow = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this, '<tr></tr>');

    this.initBehaviour();
}).inherits(sapp.ui.Component);

sapp.ui.TableViewRow.prototype.initBehaviour = function() {
    this.events.add(sapp.dom.document, 'click', function() {
        this.removeClass('activated');
    });

    this.events.add('click',function(e) {
        e.stopPropagation();
        sapp.dom.document.trigger('click');
        this.addClass('activated');
    });
};