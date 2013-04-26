sapp.require('sapphire/system/sapp.ui.Component');
/**
 * @class TabItem
 * @extends sapp.ui.Component
 */
sapp.ui.TabItem = sapp.Class(function(title) {
    sapp.ui.Component.call(this);
    this.title = title;
    this.addClass('tab-item');
}).inherits(sapp.ui.Component);