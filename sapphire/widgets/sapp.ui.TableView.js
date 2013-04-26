sapp.require('sapphire/widgets/sapp.ui.TableViewHeading');
sapp.require('sapphire/widgets/sapp.ui.TableViewRow');
sapp.require('sapphire/widgets/sapp.ui.TableViewColumn');

// sapp.ui.TableView Class
sapp.ui.TableView = sapp.Class(function() {
    sapp.ui.Component.prototype.constructor.call(this);
    this.addClass('table-view');
    this.table = null;
    sapp.ui.Component.prototype.addComponent.call(this, this.table);
}).inherits(sapp.ui.Component);

sapp.ui.TableView.prototype.createTableWidget = function(tableWidget) {
    if(!tableWidget) {
        this.table = new sapp.ui.Component('<table></table>');
    } else {
        this.table = tableWidget;
    }
    
    sapp.ui.Component.prototype.addComponent.call(this, this.table);
};

sapp.ui.TableView.prototype.addComponent = function(widget) {
    if(!this.table) {
        this.createTableWidget();
    }
    this.table.addComponent(widget);
};

sapp.ui.TableView.prototype.addComponentBefore = function(beforeWidget, widget) {
    if(!this.table) {
        this.createTableWidget();
    }
    this.table.addComponentAfter(beforeWidget, widget);
};

sapp.ui.TableView.prototype.addComponentAfter = function(afterWidget, widget) {
    if(!this.table) {
        this.createTableWidget();
    }
    this.table.addComponentAfter(afterWidget, widget);
};