var SearchBox = sapp.Class(function(api) {
    sapp.ui.Component.call(this);
    
    this.api = api;
    this.addClass('ui-yt-search');
    this.query = new sapp.ui.Component('<input type="text" />');
    this.button = new sapp.ui.Component('<button/>').text('Search');
    
    this.addComponents([this.query, this.button]);
    
    this.events.add(this.button, 'click', this.onSearch);
    this.events.add(this.query, 'keyup', function(e) {
        if(e.keyCode == 13) {
            this.onSearch();
        }
    });
    
}).inherits(sapp.ui.Component);

SearchBox.prototype.onSearch = function() {
    var response = this.api.search(this.query.val());
    this.trigger('results', response);
};