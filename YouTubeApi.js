sapp.require('sapphire/system/sapp.Http');

var YouTubeApi = function() {
    this.access_token = null;
    
    this._dev_key = "AIzaSyDwQM9CYqvImWAJI5P-efUSM3Ra8NumO5E";
    this._redirect_url = 'chrome-extension';
    this._cliden_secret = "KEngVUXIpEDd5AZTXuIXWmjK";
    this._client_id = '176705293312-eq2m2n52i9cmm2qtnnlevi57j06u8pvj.apps.googleusercontent.com';
    this._url = 'https://accounts.google.com/o/oauth2/auth'
    
    this.apiUrl = 'https://gdata.youtube.com/feeds/api/{@data}?access_token={@token}&v=2&alt=json';
};

YouTubeApi.prototype._getResponse = function() {
    var hash = window.location.hash.substring(1);
    
    if(!hash) {
        return null;
    }
    
    return JSON.parse('{"' + decodeURI(hash.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
};

YouTubeApi.prototype._setCookie = function(response) {
    response.expires_in = parseInt(response.expires_in);
    sapp.cookie.set('YouTubeToken', response.access_token, {expires: response.expires_in});
};

YouTubeApi.prototype._getCookie = function() {
    return sapp.cookie.get('YouTubeToken');
};

YouTubeApi.prototype._bindParamsToApiUrl = function(data) {
    var url = this.apiUrl.replace('{@data}', data);
    url = url.replace('{@token}', this.access_token);
    
    return url;
};

YouTubeApi.prototype.auth = function(fn) {
    this._getAccessToken(fn);
    var url = 'https://accounts.google.com/ServiceLogin?continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3Dsign_in_button%26hl%3Den_US%26next%3D%252F%26nomobiletemp%3D1&passive=true&uilel=3&service=youtube&hl=en_US';
    chrome.windows.create({url: url, type: 'popup'}, function(window) {
        chrome.tabs.onUpdated.addListener(function( tabId , info, tab ) {
            if ( info.status == "loading" ) {
                if(tab.url == 'http://www.youtube.com/') {
                    chrome.tabs.remove(tabId);
                }
            }
        });
    });
};

YouTubeApi.prototype._getAccessToken = function(fn) {
    var _this = this;
    chrome.experimental.identity.getAuthToken({interactive: true}, function(token) {
        if(token) {
            _this.access_token = token;
            fn();
        } else {
            alert('No access token');
        }
    });
};

YouTubeApi.prototype.load = function(data) {
    var url = this._bindParamsToApiUrl(data)
    
    return sapp.Http.load(url);
};

YouTubeApi.prototype.getPlaylists = function() {
    return this.load('users/default/playlists')
};

YouTubeApi.prototype.getFavorites = function() {
    return this.load('users/default/favorites')
};

YouTubeApi.prototype.getWatchLater = function() {
    return this.load('users/default/watch_later')
};

YouTubeApi.prototype.getMostRecent = function() {
    return this.load('standardfeeds/most_recent');
};

YouTubeApi.prototype.getMostViewed = function() {
    return this.load('standardfeeds/most_viewed');
};

YouTubeApi.prototype.getTopRated = function() {
    return this.load('standardfeeds/top_rated');
};

YouTubeApi.prototype.getMostDiscussed = function() {
    return this.load('standardfeeds/most_discussed');
};

YouTubeApi.prototype.getTopFavorites = function() {
    return this.load('standardfeeds/top_favorites');
};

YouTubeApi.prototype.getMostLinked = function() {
    return this.load('standardfeeds/most_linked');
};

YouTubeApi.prototype.getRecentlyFeatured = function() {
    return this.load('standardfeeds/recently_featured');
};

YouTubeApi.prototype.getMostResponded = function() {
    return this.load('standardfeeds/most_responded');
};

YouTubeApi.prototype.getFriendsActivity = function() {
    return this.load('users/default/friendsactivity');
};

YouTubeApi.prototype.getSubscriptions = function() {
    return this.load('users/default/subscriptions');
};

YouTubeApi.prototype.search = function(q) {
    var url = this._bindParamsToApiUrl('videos') + '&q='+q;
    
    return sapp.Http.load(url);
};