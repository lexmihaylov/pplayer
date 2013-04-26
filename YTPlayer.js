/**
 * @class YTPlayer
 * @extends sapp.ui.Component
 */
var YTPlayer = sapp.Class(function() {
    sapp.ui.Component.call(this);
    
    this.frame = new sapp.ui.Component('<iframe width="100%" height="100%" frameborder="0"/>');
    
    this.append(this.frame);
    
    this.addClass('yt-player');
    this.css({
        'overflow': 'hidden',
        'position': 'relative'
    });
    
    this._mask = new sapp.ui.Component();
    this._initMask();
}).inherits(sapp.ui.Component);

/**
 * @method setSrc
 * @param {string} src
 */
YTPlayer.prototype.setSrc = function(src) {
   this.frame.attr('src', src);
};

/**
 * @method _initMask
 * @protected
 */
YTPlayer.prototype._initMask = function() {
    this.append(this._mask);
    this._mask.css({
        'display': 'none',
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'bottom':0,
        'right':0
    });
    
    this._mask.events.add(sapp.dom.window, 'resizestart', function() {
        this.show();
    });
    
    this._mask.events.add(sapp.dom.window, 'resizestop', function() {
        this.hide();
    });
};