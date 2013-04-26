sapp.require('sapphire/widgets/sapp.ui.VerticalLayout');
sapp.require('sapphire/widgets/sapp.ui.TabLayout');

sapp.require('YouTubeApi');
sapp.require('SearchBox');
sapp.require('YTList');
sapp.require('YTPlayer');

var pplayer = sapp.Class(function() {
    sapp.ui.Component.call(this);
    
    sapp.dom.body.append(this);
}).inherits(sapp.ui.Component);

pplayer.youTube = new YouTubeApi();
pplayer.prototype.initialize = function() {    
    this.layout(function() {
        this.fillBoth();
    });
    
    this.content();
    this.gridLayout();
    this.searchBox();
    
    this.leftTabulation();
    this.rightTabulation();
    this.player();
    this.ytList();
    this.ytFavorites();
    this.ytLater();
    this.ytMostViewed();
    this.ytRelatedVideos();
    this.ytSearch();
    
    this.loadContent();
};


pplayer.prototype.leftTabulation = function() {
    pplayer.leftTabulation = new sapp.ui.TabLayout(pplayer.pane1);
    
    pplayer.playListTab = new sapp.ui.TabItem('My Playlists');
    pplayer.searchResultsTab = new sapp.ui.TabItem('Search Results');
    pplayer.watchLaterTab = new sapp.ui.TabItem('Watch Later');
    
    pplayer.leftTabulation.addTab(pplayer.playListTab);
    pplayer.leftTabulation.addTab(pplayer.searchResultsTab);
    pplayer.leftTabulation.addTab(pplayer.watchLaterTab);
};

pplayer.prototype.rightTabulation = function() {
    pplayer.rightTabulation = new sapp.ui.TabLayout(pplayer.pane3);
    
    pplayer.favorites = new sapp.ui.TabItem('Favorites')
    pplayer.mostViewedTab = new sapp.ui.TabItem('Most Viewed');
    pplayer.relatedTab = new sapp.ui.TabItem('Related Videos');
    
    pplayer.rightTabulation.addTab(pplayer.favorites);
    pplayer.rightTabulation.addTab(pplayer.mostViewedTab);
    pplayer.rightTabulation.addTab(pplayer.relatedTab);
};

pplayer.prototype.player = function() {
    pplayer.player = new YTPlayer();
    pplayer.pane2.append(pplayer.player);
    
    pplayer.player.layout(function() {
        this.fillBoth();
    });
};

pplayer.prototype.loadContent = function() {
    pplayer.leftTabulation.showTab(0);
    pplayer.rightTabulation.showTab(0);
    
    var playlists = pplayer.youTube.getPlaylists();
    if(playlists && playlists.feed) {
        pplayer.ytList.setList(playlists.feed);
    }
    
    var favorites = pplayer.youTube.getFavorites();
    if(favorites && favorites.feed) {
        pplayer.ytFavorites.setList(favorites.feed);
    }
    
    var watchLater = pplayer.youTube.getWatchLater();
    if(watchLater && watchLater.feed) {    
        pplayer.ytLater.setList(watchLater.feed);
    }
    
    var mostViewed = pplayer.youTube.getMostViewed();
    if(mostViewed && mostViewed.feed) {
        pplayer.ytMostViewed.setList(mostViewed.feed);
    }
};

pplayer.prototype.ytList = function() {
    pplayer.ytList = new YTList();
    pplayer.playListTab.addComponent(pplayer.ytList);
    
    pplayer.ytList.layout(function(){
        this.fillBoth();
    });
};

pplayer.prototype.ytLater = function() {
    pplayer.ytLater = new YTList();
    pplayer.watchLaterTab.addComponent(pplayer.ytLater);
    
    pplayer.ytLater.layout(function(){
        this.fillBoth();
    });
};

pplayer.prototype.ytFavorites = function() {
    pplayer.ytFavorites = new YTList();
    pplayer.favorites.addComponent(pplayer.ytFavorites);
    
    pplayer.ytFavorites.layout(function(){
        this.fillBoth();
    });
};

pplayer.prototype.ytSearch = function() {
    pplayer.ytSearch = new YTList();
    pplayer.searchResultsTab.addComponent(pplayer.ytSearch);
    
    pplayer.ytSearch.layout(function(){
        this.fillBoth();
    });
};

pplayer.prototype.ytMostViewed = function() {
    pplayer.ytMostViewed = new YTList();
    pplayer.mostViewedTab.addComponent(pplayer.ytMostViewed);
    
    pplayer.ytMostViewed.layout(function(){
        this.fillBoth();
    });
};

pplayer.prototype.ytRelatedVideos = function() {
    pplayer.ytRelatedVideos = new YTList();
    
    pplayer.relatedTab.addComponent(pplayer.ytRelatedVideos);
    
    pplayer.ytRelatedVideos.layout(function() {
        this.fillBoth();
    });
};

pplayer.prototype.content = function() {
    pplayer.contentView = new sapp.ui.Component();
    pplayer.menuBar = new sapp.ui.Component();
    pplayer.menuBar.addClass('ui-menu-bar');
    this.addComponents([pplayer.menuBar, pplayer.contentView]);
    
    pplayer.menuBar.layout(function() {
        this.fillHorizontal();
    });
    
    var ytLogo = new sapp.ui.Component('<div class="yt-logo"/>');
    pplayer.menuBar.append(ytLogo);
    ytLogo.events.add('click', {receiver: this}, function(e) {
        e.data.receiver.loadContent();
    });
    
    pplayer.contentView.layout(function() {
        this.fillHorizontal();
        this.height(
            sapp.dom.body.height() - pplayer.menuBar.outerHeight(true)
        );
    });
};

pplayer.prototype.searchBox = function() {
    pplayer.searchBox = new SearchBox(pplayer.youTube);
    pplayer.menuBar.addComponent(pplayer.searchBox);
    
    pplayer.searchBox.events.add('results', function(e, data) {
        console.log(typeof data);
        if(data.feed) {
            pplayer.ytSearch.setList(data.feed);
            pplayer.leftTabulation.showTab(1);
        }
    });
};

pplayer.prototype.gridLayout = function() {
    pplayer.layout = new sapp.ui.VerticalLayout(
        pplayer.contentView,
        {resizable: true, helper: true}
    );
    
    pplayer.pane1 = new sapp.ui.Pane()
        .width('307px')
        .minWidth('307px');
    pplayer.pane2 = new sapp.ui.Pane()
        .minWidth('500px');
    pplayer.pane3 = new sapp.ui.Pane()
        .width('307px')
        .minWidth('307px');
    
    pplayer.layout.addComponents([
        pplayer.pane1,
        pplayer.pane2,
        pplayer.pane3
    ]);
    
    pplayer.layout.initialize();
};

sapp.dom.ready(function() {
    var app = new pplayer();
    pplayer.youTube.auth(function() {
        app.initialize();
    });
});