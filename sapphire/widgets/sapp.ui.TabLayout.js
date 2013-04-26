sapp.require('sapphire/widgets/sapp.ui.TabItem')

/**
 * @class TabLayout
 * @inherits sapp.ui.Component
 */

sapp.ui.TabLayout = sapp.Class(function(parentNode) {
    sapp.ui.Component.call(this);
    
    this.setParent(parentNode);
    
    this.tabControl = new sapp.ui.Component();
    this.viewControl = new sapp.ui.Component();
    
    this.addClass('tab-layout');
    this.tabControl.addClass('tab-layout-tabs');
    this.viewControl.addClass('tab-layout-view');
    
    this.viewControl.css('overflow', 'hidden');
    
    this.append([this.tabControl.get(0), this.viewControl.get(0)]);
    
    this.render();
}).inherits(sapp.ui.Component);

/**
 * @method render
 */
sapp.ui.TabLayout.prototype.render = function() {
    this.getParent().append(this);
    
    this.layout(function() {
        this.fillBoth();
    });
};

/**
 * @override
 * @method layout
 * @param {function} handler
 */
sapp.ui.TabLayout.prototype.layout = function(handler) {
    sapp.ui.Component.prototype.layout.call(this, handler);
    
    this.setup();
};

/**
 * @methos setup
 */
sapp.ui.TabLayout.prototype.setup = function() {
    sapp.ui.Component.prototype.layout.call(this, function() {
        this.viewControl.fillHorizontal();
        this.viewControl.height(
            (this.height() - this.tabControl.outerHeight(true)) - 
                (this.viewControl.outerHeight(true) - this.viewControl.height())
        );
    });
};

/**
 * @method addTab
 * @param {TabItem} tabItem
 */
sapp.ui.TabLayout.prototype.addTab = function(tabItem) {
    var tabButton = new sapp.ui.Component('<button/>');
    
    tabButton.text(tabItem.title);
    
    this.viewControl.append(tabItem);
    this.tabControl.append(tabButton);
    
    tabItem.layout(function() {
        this.fillBoth();
    });
    
    tabButton.events.add('click', {receiver: this}, function(e) {
        e.data.receiver.viewControl.children().hide();
        e.data.receiver.tabControl.children().attr('disabled', false);
        tabItem.show();
        this.attr('disabled', true);
    });
    
    tabButton.trigger('click');
};

/**
 * @method showTab
 * @param {int} index
 */
sapp.ui.TabLayout.prototype.showTab = function(index) {
    this.tabControl.children().eq(index).trigger('click');
};



