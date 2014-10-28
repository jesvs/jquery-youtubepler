(function($) {
  return $.fn.youtubepler = function(opts) {
    var href, link, links, onPlayerReady, parseYouTubeUrl, player_container, video_ids, _i, _len;
    parseYouTubeUrl = function(url) {
      var ampPos, video_id;
      video_id = url.split('v=')[1];
      ampPos = video_id.indexOf('&');
      if (ampPos !== -1) {
        video_id = video_id.substring(0, ampPos);
      }
      return video_id;
    };
    player_container = $(opts.player);
    this.width = opts.width || 640;
    this.height = opts.height || 390;
    this.player = null;
    video_ids = [];
    links = this.find('a');
    for (_i = 0, _len = links.length; _i < _len; _i++) {
      link = links[_i];
      href = link.href;
      if (!href.indexOf('youtube' > -1)) {
        continue;
      }
      video_ids.push(parseYouTubeUrl(href));
      $(link).on('click', (function(_this) {
        return function(event) {
          var index;
          event.preventDefault();
          event.stopPropagation();
          links.removeClass('active');
          $(_this).addClass('active');
          index = _this.player.getPlaylist().indexOf(parseYouTubeUrl(event.target.href));
          return _this.player.playVideoAt(index);
        };
      })(this));
    }
    player_container.append($("<script src='https://www.youtube.com/iframe_api'>"));
    window.onYouTubeIframeAPIReady = (function(_this) {
      return function() {
        return _this.player = new YT.Player('player', {
          height: _this.height,
          width: _this.width,
          events: {
            'onReady': onPlayerReady
          }
        });
      };
    })(this);
    onPlayerReady = (function(_this) {
      return function(event) {
        return event.target.cuePlaylist(video_ids);
      };
    })(this);
    return this;
  };
})(jQuery);

//# sourceMappingURL=jquery.youtubepler.js.map
