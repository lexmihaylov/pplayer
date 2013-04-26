var YTList = sapp.Class(function() {
    sapp.ui.Component.call(this);
    
    this.addClass('ui-yt-list');
}).inherits(sapp.ui.Component);

YTList.prototype.setList = function(list) {
    if(list.entry) {
        this.empty();
        this.loadListItems(list);
    }
};

YTList.prototype.loadListItems = function(list) {
    for(var i = 0; i < list.entry.length; i ++) {
        try {
            this.draw(list.entry[i]);
        } catch(e) {
            console.info(e.toString());
        }
    }

    this.moreResults(list);
};

YTList.prototype.moreResults = function(feed) {
    var start = feed['openSearch$startIndex']['$t'],
        perPage = feed['openSearch$itemsPerPage']['$t'],
        total = feed['openSearch$totalResults']['$t'];
        
    if(total > (start + perPage)) {
        var more = new sapp.ui.Component('<button class="yt-view-more">View More</button>');
        
        var uri = feed.link[3];
        if(uri.rel != 'self') {
            uri = feed.link[4];
        }
        
        uri = uri.href.
                  replace(new RegExp("start\-index="+start, 'i'), 'start-index='+(start+perPage));
        this.append(more);
        
        more.events.add('click', {receiver: this}, function(e) {
            var response = sapp.Http.load(uri);
            
            this.remove();
            
            if(response.feed && response.feed.entry) {
                e.data.receiver.loadListItems(response.feed);
            }
        });
    }
    
};

YTList.prototype.draw = function(item) {
    var listItem = new sapp.ui.Component();
    var thumb = new sapp.ui.Component('<img/>');
    thumb.attr('src', item['media$group']['media$thumbnail'][0].url);
    
    listItem.append(thumb);
    listItem.append('<label>'+item.title['$t']+'</label>');
    
    this.append(listItem);
    
    listItem.events.add('click', {receiver: this}, function(e) {
        e.data.receiver.children('.activated')
                  .removeClass('activated');
        
        
        this.addClass('activated');
        if(item['media$group']['yt$videoid']) {
            pplayer.player.setSrc('http://www.youtube.com/embed/'+item['media$group']['yt$videoid']['$t']);
            var relatedList = sapp.Http.load(item.link[2].href+'&alt=json');
            
            pplayer.ytRelatedVideos.setList(relatedList.feed);
            pplayer.rightTabulation.showTab(2);
        } else {
            pplayer.player.setSrc('http://www.youtube.com/embed/videoseries?list='+item['yt$playlistId']['$t']);
        }
    });
};

